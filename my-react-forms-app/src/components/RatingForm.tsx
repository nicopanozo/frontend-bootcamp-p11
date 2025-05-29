import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { RatingFormData } from '../types';

const RatingForm: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<RatingFormData | null>(null);

  const initialValues: RatingFormData = {
    name: '',
    rating: 5,
    feedback: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    rating: Yup.number()
      .required('Rating is required')
      .min(1, 'Rating must be between 1 and 5')
      .max(5, 'Rating must be between 1 and 5'),
    feedback: Yup.string().when('rating', {
      is: (rating: number) => rating < 3,
      then: (schema) => schema.required('Feedback is required when rating is less than 3 stars'),
      otherwise: (schema) => schema
    })
  });

  const onSubmit = (values: RatingFormData) => {
    console.log('Rating form submitted:', values);
    setSubmittedData(values);
  };

  const StarRating: React.FC<{ 
    rating: number; 
    onRatingChange: (rating: number) => void;
  }> = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </span>
        ))}
        <span style={{ marginLeft: '10px', fontSize: '14px' }}>
          {rating} star{rating !== 1 ? 's' : ''}
        </span>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Product Rating Form</h2>
      <p>Please rate our product and provide feedback</p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <Field
                name="name"
                type="text"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Rating *</label>
              <StarRating
                rating={values.rating}
                onRatingChange={(rating) => setFieldValue('rating', rating)}
              />
              <ErrorMessage name="rating" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="feedback">
                Feedback {values.rating < 3 && '*'}
              </label>
              {values.rating < 3 && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#dc3545', 
                  marginBottom: '5px' 
                }}>
                  Please provide feedback to help us improve
                </p>
              )}
              <Field
                name="feedback"
                as="textarea"
                rows="4"
                placeholder={
                  values.rating < 3 
                    ? "Please tell us how we can improve..." 
                    : "Any additional comments? (optional)"
                }
              />
              <ErrorMessage name="feedback" component="div" className="error" />
            </div>

            <button type="submit" className="btn-success">
              Submit Rating
            </button>
          </Form>
        )}
      </Formik>

      {submittedData && (
        <div className="result">
          <h3>Thank you for your feedback!</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Rating:</strong> {submittedData.rating} star{submittedData.rating !== 1 ? 's' : ''}</p>
          {submittedData.feedback && (
            <p><strong>Feedback:</strong> {submittedData.feedback}</p>
          )}
          <p style={{ 
            marginTop: '15px', 
            fontStyle: 'italic', 
            color: '#28a745' 
          }}>
            {submittedData.rating >= 3 
              ? "We're glad you're satisfied with our product!" 
              : "Thank you for your feedback. We'll work on improving!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default RatingForm;