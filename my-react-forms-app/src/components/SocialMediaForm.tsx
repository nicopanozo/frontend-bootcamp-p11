import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { SocialMediaLink } from '../types';

interface FormData {
  links: SocialMediaLink[];
}

const platforms = [
  'Facebook',
  'Twitter',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'TikTok',
  'Other'
];

const SocialMediaForm: React.FC = () => {
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: {
      links: [{ platform: '', url: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links'
  });

  const onSubmit = (data: FormData) => {
    console.log('Social Media Links submitted:', data);
    alert(`Successfully submitted ${data.links.length} social media links!`);
  };

  const validateURL = (value: string) => {
    if (!value) return 'URL is required';
    
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(value) || 'Please enter a valid URL';
  };

  const canAddMore = fields.length < 5;
  const canRemove = fields.length > 1;

  return (
    <div className="container">
      <h2>Social Media Links</h2>
      <p>Add your social media profiles (minimum 1, maximum 5)</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="link-item">
            <div className="link-fields">
              <div className="field-group">
                <label>Platform</label>
                <select
                  {...register(`links.${index}.platform`, {
                    required: 'Platform is required'
                  })}
                >
                  <option value="">Select Platform</option>
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
                {errors.links?.[index]?.platform && (
                  <div className="error">
                    {errors.links[index]?.platform?.message}
                  </div>
                )}
              </div>

              <div className="field-group">
                <label>URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/yourprofile"
                  {...register(`links.${index}.url`, {
                    validate: validateURL
                  })}
                />
                {errors.links?.[index]?.url && (
                  <div className="error">
                    {errors.links[index]?.url?.message}
                  </div>
                )}
              </div>
            </div>

            {canRemove && (
              <button
                type="button"
                className="btn-danger"
                onClick={() => remove(index)}
                title="Remove this link"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <div style={{ marginBottom: '20px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => append({ platform: '', url: '' })}
            disabled={!canAddMore}
            title={canAddMore ? 'Add another link' : 'Maximum 5 links allowed'}
          >
            {canAddMore ? 'Add Link' : 'Max Links Reached (5)'}
          </button>
          <span style={{ marginLeft: '10px', color: '#666', fontSize: '14px' }}>
            {fields.length}/5 links
          </span>
        </div>

        <button type="submit" className="btn-success">
          Submit Social Media Links
        </button>
      </form>
    </div>
  );
};

export default SocialMediaForm;