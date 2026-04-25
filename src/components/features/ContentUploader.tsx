import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, Video as VideoIcon, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../lib/utils';

interface ContentUploaderProps {
  onUpload: (files: File[]) => void;
  allowedTypes?: string[];
}

const ContentUploader: React.FC<ContentUploaderProps> = ({ 
  onUpload, 
  allowedTypes = ['.pdf', '.mp4', '.jpg', '.png'] 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed border-white/10 rounded-[20px] p-12 text-center transition-all",
          isDragging ? "bg-primary/10 border-primary shadow-2xl scale-[1.02]" : "bg-white/[0.02] hover:bg-white/[0.04]",
          files.length > 0 && "pb-8"
        )}
      >
        <input 
          type="file" 
          id="file-upload" 
          multiple 
          accept={allowedTypes.join(',')}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleSelect}
        />
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Upload size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Upload Your Materials</h3>
            <p className="text-sm text-slate-500 mt-1">Drag and drop or click to browse your files.</p>
            <p className="text-[10px] text-slate-600 font-mono mt-2 uppercase tracking-[0.2em]">Supported: {allowedTypes.join(', ')}</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-4">
          {files.map((file, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4 bg-white/[0.04]" hover={false}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {file.type.includes('pdf') ? <FileText size={20} /> : <VideoIcon size={20} />}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{file.name}</p>
                <p className="text-[10px] text-slate-500 font-mono uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={() => removeFile(i)}
                className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-slate-500 hover:text-danger transition-colors"
              >
                <X size={16} />
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-white/5">
          <Button variant="ghost" className="px-8" onClick={() => setFiles([])}>Discard All</Button>
          <Button 
            className="px-10" 
            onClick={() => onUpload(files)}
          >
            <CheckCircle2 size={18} />
            Execute Upload Protocol
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentUploader;
