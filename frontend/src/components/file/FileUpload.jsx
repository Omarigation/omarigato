import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileContext } from '../../context/FileContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const { handleFileUpload, loading, error, uploadProgress } = useContext(FileContext);
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  
  // Handle file upload button click
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle upload submission
  const handleUpload = async () => {
    if (!file) return;
    
    const uploadedFile = await handleFileUpload(file, (data) => {
      // Navigate to processing page on successful upload
      navigate(`/processing/${data.id}`);
    });
    
    if (uploadedFile) {
      setFile(null);
    }
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <Card className="max-w-xl mx-auto" shadow>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-purple-900">Upload File</h3>
        <p className="text-gray-600">Upload a file to process and analyze.</p>
        
        {/* Drag and drop area */}
        <div 
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleFileUploadClick}
        >
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          
          <svg 
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop a file here, or click to select a file
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: JPG, JPEG, PNG, GIF, PDF, TXT, CSV
          </p>
        </div>
        
        {/* Selected file info */}
        {file && (
          <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex-shrink-0">
              <svg 
                className="h-8 w-8 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setFile(null)}
              >
                <svg 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Upload progress */}
        {loading && uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Uploading...</span>
              <span className="text-gray-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        {/* Upload button */}
        <Button
          variant="primary"
          size="large"
          fullWidth
          disabled={!file || loading}
          onClick={handleUpload}
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>
    </Card>
  );
};

export default FileUpload;