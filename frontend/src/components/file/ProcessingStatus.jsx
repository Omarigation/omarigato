import React, { useEffect, useState, useContext } from 'react';
import { FileContext } from '../../context/FileContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProcessingStatus = ({ fileId }) => {
  const [statusInterval, setStatusInterval] = useState(null);
  const { currentFile, fetchFileById, checkFileStatus, handleReprocessFile, handleDeleteFile, loading } = useContext(FileContext);
  
  // Fetch file data on component mount
  useEffect(() => {
    const loadFile = async () => {
      await fetchFileById(fileId);
    };
    
    if (fileId) {
      loadFile();
    }
    
    return () => {
      if (statusInterval) {
        clearInterval(statusInterval);
      }
    };
  }, [fileId, fetchFileById]);
  
  // Set up polling for file status if still processing
  useEffect(() => {
    if (currentFile && (currentFile.status === 'pending' || currentFile.status === 'processing')) {
      // Check status every 3 seconds
      const interval = setInterval(() => {
        checkFileStatus(fileId);
      }, 3000);
      
      setStatusInterval(interval);
      
      return () => clearInterval(interval);
    } else if (statusInterval) {
      clearInterval(statusInterval);
      setStatusInterval(null);
    }
  }, [currentFile, fileId, checkFileStatus]);
  
  // Handle reprocess button click
  const handleReprocess = async () => {
    await handleReprocessFile(fileId);
  };
  
  // Handle delete button click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      const success = await handleDeleteFile(fileId);
      if (success) {
        // Navigate to processing page with no file ID
        window.location.href = '/processing';
      }
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Get status color and label
  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return {
          color: 'yellow',
          label: 'Pending',
          icon: (
            <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case 'processing':
        return {
          color: 'blue',
          label: 'Processing',
          icon: (
            <svg className="h-5 w-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
        };
      case 'completed':
        return {
          color: 'green',
          label: 'Completed',
          icon: (
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'failed':
        return {
          color: 'red',
          label: 'Failed',
          icon: (
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      default:
        return {
          color: 'gray',
          label: 'Unknown',
          icon: (
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };
  
  // If no file ID or loading
  if (!fileId) {
    return <div className="text-center py-8">No file selected.</div>;
  }
  
  if (loading && !currentFile) {
    return (
      <div className="text-center py-8">
        <div className="loading-anime mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading file information...</p>
      </div>
    );
  }
  
  // If file not found
  if (!currentFile) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">File not found or you don't have access to it.</p>
      </div>
    );
  }
  
  // Get status information
  const statusInfo = getStatusInfo(currentFile.status);
  
  return (
    <Card shadow className="max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* File info header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-purple-900">{currentFile.original_filename}</h2>
            <p className="text-sm text-gray-500">Uploaded: {formatDate(currentFile.created_at)}</p>
          </div>
          
          <div className={`mt-2 sm:mt-0 flex items-center px-3 py-1 rounded-full bg-${statusInfo.color}-100`}>
            {statusInfo.icon}
            <span className={`ml-1.5 text-sm font-medium text-${statusInfo.color}-800`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
        
        {/* Processing status section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-900">Processing Status</h3>
          
          {/* Show processing spinner for pending/processing */}
          {(currentFile.status === 'pending' || currentFile.status === 'processing') && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
                </div>
                <div>
                  <p className="text-blue-800">
                    {currentFile.status === 'pending' ? 'Waiting to process file...' : 'Processing file...'}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    This may take a moment. The page will update automatically.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Show success message for completed */}
          {currentFile.status === 'completed' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800">
                  File processed successfully!
                </p>
              </div>
            </div>
          )}
          
          {/* Show error message for failed */}
          {currentFile.status === 'failed' && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-red-800">
                    Failed to process file.
                  </p>
                  {currentFile.processing_result?.error && (
                    <p className="text-sm text-red-600 mt-1">
                      Error: {currentFile.processing_result.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* File details section */}
        {currentFile.status === 'completed' && currentFile.processing_result && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-900">File Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* Display processing results based on file type */}
              {currentFile.processing_result.type === 'csv' && (
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Rows</p>
                      <p className="font-medium">{currentFile.processing_result.rows}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Columns</p>
                      <p className="font-medium">{currentFile.processing_result.columns}</p>
                    </div>
                  </div>
                  
                  {/* Column names */}
                  {currentFile.processing_result.column_names && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-1">Column Names</p>
                      <div className="flex flex-wrap gap-2">
                        {currentFile.processing_result.column_names.map((col, index) => (
                          <span 
                            key={index} 
                            className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                          >
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Sample data */}
                  {currentFile.processing_result.sample_data && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-1">Sample Data (First 5 rows)</p>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              {currentFile.processing_result.column_names.map((col, index) => (
                                <th 
                                  key={index}
                                  className="px-2 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                                >
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {currentFile.processing_result.sample_data.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {currentFile.processing_result.column_names.map((col, colIndex) => (
                                  <td 
                                    key={colIndex}
                                    className="px-2 py-2 whitespace-nowrap text-sm text-gray-700"
                                  >
                                    {row[col] !== undefined ? String(row[col]) : ''}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Text file content preview */}
              {currentFile.processing_result.type === 'text' && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Lines</p>
                      <p className="font-medium">{currentFile.processing_result.line_count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Words</p>
                      <p className="font-medium">{currentFile.processing_result.word_count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Characters</p>
                      <p className="font-medium">{currentFile.processing_result.character_count}</p>
                    </div>
                  </div>
                  
                  {/* Content preview */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">Content Preview</p>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {currentFile.processing_result.preview}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Generic display for other file types */}
              {!['csv', 'text'].includes(currentFile.processing_result.type) && (
                <div className="space-y-2">
                  {Object.entries(currentFile.processing_result).map(([key, value]) => {
                    // Skip complex objects or arrays
                    if (typeof value === 'object' && value !== null) {
                      return null;
                    }
                    
                    // Skip message
                    if (key === 'message') {
                      return null;
                    }
                    
                    return (
                      <div key={key}>
                        <p className="text-sm text-gray-500">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Button variant="primary" onClick={handleReprocess} disabled={loading}>
            Reprocess File
          </Button>
          <Button variant="outline" onClick={handleDelete} disabled={loading}>
            Delete File
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProcessingStatus;