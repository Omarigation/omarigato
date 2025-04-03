import api from './api';

/**
 * Upload a file
 * @param {File} file - The file to upload
 * @param {Function} onUploadProgress - Callback for upload progress
 * @returns {Promise} - Promise with file data
 */
export const uploadFile = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onUploadProgress) {
        onUploadProgress(percentCompleted);
      }
    },
  });
  
  return response.data;
};

/**
 * Get all files for the current user
 * @param {number} skip - Number of items to skip for pagination
 * @param {number} limit - Number of items to return
 * @returns {Promise} - Promise with files data
 */
export const getUserFiles = async (skip = 0, limit = 100) => {
  const response = await api.get(`/files?skip=${skip}&limit=${limit}`);
  return response.data;
};

/**
 * Get a specific file by ID
 * @param {number} fileId - The file ID
 * @returns {Promise} - Promise with file data
 */
export const getFileById = async (fileId) => {
  const response = await api.get(`/files/${fileId}`);
  return response.data;
};

/**
 * Get the processing status of a file
 * @param {number} fileId - The file ID
 * @returns {Promise} - Promise with status data
 */
export const getFileStatus = async (fileId) => {
  const response = await api.get(`/files/${fileId}/status`);
  return response.data;
};

/**
 * Reprocess a file
 * @param {number} fileId - The file ID
 * @returns {Promise} - Promise with reprocess result
 */
export const reprocessFile = async (fileId) => {
  const response = await api.post(`/files/${fileId}/reprocess`);
  return response.data;
};

/**
 * Delete a file
 * @param {number} fileId - The file ID
 * @returns {Promise} - Promise with delete result
 */
export const deleteFile = async (fileId) => {
  const response = await api.delete(`/files/${fileId}`);
  return response.data;
};