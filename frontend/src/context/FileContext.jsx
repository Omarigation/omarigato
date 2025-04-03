import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { 
  uploadFile, 
  getUserFiles, 
  getFileById, 
  getFileStatus, 
  reprocessFile,
  deleteFile
} from '../services/files';

// Create context
export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { isAuthenticated } = useContext(AuthContext);

  // Fetch user's files when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserFiles();
    } else {
      setFiles([]);
      setCurrentFile(null);
    }
  }, [isAuthenticated]);

  // Fetch user's files
  const fetchUserFiles = async () => {
    if (!isAuthenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUserFiles();
      setFiles(data.files || []);
    } catch (err) {
      setError('Failed to fetch files');
    } finally {
      setLoading(false);
    }
  };

  // Get file by ID
  const fetchFileById = async (fileId) => {
    if (!isAuthenticated || !fileId) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getFileById(fileId);
      setCurrentFile(data);
      return data;
    } catch (err) {
      setError('Failed to fetch file');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Check file processing status
  const checkFileStatus = async (fileId) => {
    if (!isAuthenticated || !fileId) return null;
    
    try {
      const data = await getFileStatus(fileId);
      
      // Update current file if it's the one we're checking
      if (currentFile && currentFile.id === parseInt(fileId)) {
        setCurrentFile(prev => ({
          ...prev,
          status: data.status,
          processing_result: data.processing_result
        }));
      }
      
      return data;
    } catch (err) {
      console.error('Failed to check file status:', err);
      return null;
    }
  };

  // Upload a new file
  const handleFileUpload = async (file, onSuccess) => {
    if (!isAuthenticated || !file) return;
    
    setLoading(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      const data = await uploadFile(file, (progress) => {
        setUploadProgress(progress);
      });
      
      // Add the new file to the files list
      setFiles(prev => [data, ...prev]);
      setCurrentFile(data);
      
      if (onSuccess) onSuccess(data);
      return data;
    } catch (err) {
      setError('Failed to upload file');
      return null;
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Reprocess a file
  const handleReprocessFile = async (fileId) => {
    if (!isAuthenticated || !fileId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await reprocessFile(fileId);
      
      // Update the file status
      if (currentFile && currentFile.id === parseInt(fileId)) {
        setCurrentFile(prev => ({
          ...prev,
          status: 'pending',
          processing_result: null
        }));
      }
      
      // Update the file in the files list
      setFiles(prev => prev.map(file => 
        file.id === parseInt(fileId) 
          ? { ...file, status: 'pending', processing_result: null }
          : file
      ));
      
      return true;
    } catch (err) {
      setError('Failed to reprocess file');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete a file
  const handleDeleteFile = async (fileId) => {
    if (!isAuthenticated || !fileId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await deleteFile(fileId);
      
      // Remove the file from the files list
      setFiles(prev => prev.filter(file => file.id !== parseInt(fileId)));
      
      // Clear current file if it's the one we're deleting
      if (currentFile && currentFile.id === parseInt(fileId)) {
        setCurrentFile(null);
      }
      
      return true;
    } catch (err) {
      setError('Failed to delete file');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FileContext.Provider
      value={{
        files,
        currentFile,
        loading,
        error,
        uploadProgress,
        fetchUserFiles,
        fetchFileById,
        checkFileStatus,
        handleFileUpload,
        handleReprocessFile,
        handleDeleteFile
      }}
    >
      {children}
    </FileContext.Provider>
  );
};