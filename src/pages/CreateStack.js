import React from 'react';
import { FiBold, FiItalic, FiUnderline, FiCode, FiLink2, FiList, FiImage, FiPaperclip, FiMoreHorizontal } from 'react-icons/fi';
import './CreateStack.css';

const CreateStack = () => {
  return (
    <div className="create-stack-container">
       <h1 className="create-stack-title">Stack Name</h1>
       <input type="text" className="stack-name-input" placeholder="#anyotherstackshewantstoposttot" />
       
       <div className="editor-container">
            <textarea 
                className="editor-textarea" 
                placeholder="Description with rich text editing features (supports markdown)">
            </textarea>
            <div className="editor-toolbar">
                <div className="toolbar-group">
                    <button className="toolbar-btn"><FiMoreHorizontal /></button>
                    <button className="toolbar-btn"><FiBold /></button>
                    <button className="toolbar-btn"><FiItalic /></button>
                    <button className="toolbar-btn"><FiUnderline /></button>
                    <button className="toolbar-btn"><FiCode /></button>
                </div>
                 <div className="toolbar-group">
                    <button className="toolbar-btn"><FiList /></button>
                    <button className="toolbar-btn"><FiImage /></button>
                    <button className="toolbar-btn"><FiPaperclip /></button>
                    <button className="toolbar-btn"><FiLink2 /></button>
                </div>
            </div>
       </div>

       <div className="upload-button-container">
         <button className="upload-button">Upload</button>
       </div>
    </div>
  );
};

export default CreateStack;