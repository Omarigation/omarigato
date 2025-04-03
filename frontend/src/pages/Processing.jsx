import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileContext } from '../context/FileContext';
import ProcessingStatus from '../components/file/ProcessingStatus';
import FileUpload from '../components/file/FileUpload';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Processing = () => {
  const { fileId } = useParams();
  const { files, fetchUserFiles, loading } = useContext(FileContext);
  const [selectedFile, setSelectedFile] = useState(fileId || null);
  
  // Set page title
  useEffect(() => {
    document.title = 'File Processing | Anime Portal';
  }, []);
  
  // Fetch user files on component mount
  useEffect(() => {
    fetchUserFiles();
  }, [fetchUserFiles]);
  
  // Update selected file when URL param changes
  useEffect(() => {
    if (fileId) {
      setSelectedFile(fileId);
    }
  }, [fileId]);
  
  // Handle file selection
  const handleSelectFile = (id) => {
    setSelectedFile(id);
    // Update URL without full page reload
    window.history.pushState({}, '', `/processing/${id}`);
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Get file icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType.includes('image')) {
      return (
        <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.includes('pdf')) {
      return (
        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.includes('csv') || fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return (
        <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (fileType.includes('text')) {
      return (
        <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else {
      return (
        <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };
  
  // Get status color classes
  const getStatusClasses = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-purple-900">File Processing</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar with file list */}
        <div className="lg:col-span-4">
          <Card shadow className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-900">Your Files</h2>
              <Link to="/processing">
                <Button variant="primary" size="small">
                  Upload New
                </Button>
              </Link>
            </div>
            
            {loading && files.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="loading-anime"></div>
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No files uploaded yet.</p>
                <Link to="/processing">
                  <Button variant="primary">Upload Your First File</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {files.map((file) => (
                  <div 
                    key={file.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedFile == file.id ? 'bg-purple-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSelectFile(file.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.file_type)}
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.original_filename}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(file.created_at)}
                        </p>
                      </div>
                      <div className="ml-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(file.status)}`}>
                          {file.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-8">
          {selectedFile ? (
            <ProcessingStatus fileId={selectedFile} />
          ) : (
            <FileUpload />
          )}
        </div>
      </div>
    </div>
  );
};

export default Processing;