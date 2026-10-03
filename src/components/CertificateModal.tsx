import React from 'react';
import { X, Award, Download, Printer, CheckCircle } from 'lucide-react';
import { User, UserProgress } from '../types';
import { C_TOPICS } from '../data/cTopics';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  userProgress: UserProgress;
  isDark: boolean;
  lang: 'hi' | 'en';
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  user,
  userProgress,
  isDark,
  lang
}) => {
  if (!isOpen) return null;

  const userName = user?.name || 'Kuldeep Singh';
  const completedCount = userProgress.completedTopicIds.length;
  const totalCount = C_TOPICS.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const certDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative border overflow-hidden bg-white text-slate-900 border-slate-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Border */}
        <div className="border-4 border-double border-blue-600/40 p-6 sm:p-8 rounded-2xl relative text-center space-y-4 bg-gradient-to-b from-blue-50/30 via-white to-slate-50/50">
          {/* Watermark / Background Crest */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <span className="text-9xl font-extrabold font-mono text-blue-900">C</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-2">
            <Award className="w-8 h-8 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900">
              C-Guru Academy • Certificate of Achievement
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-serif">
            Certificate of C Language Mastery
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            This certifies that
          </p>

          {/* Student Name */}
          <div className="text-2xl sm:text-4xl font-bold font-serif text-blue-900 border-b-2 border-blue-500/40 pb-2 inline-block px-8">
            {userName}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
            has demonstrated exceptional dedication and successfully completed rigorous training in
            <strong className="text-blue-950"> C Programming from Basics to File Handling</strong>, including
            data types, pointers, structures, dynamic memory allocation (DMA), and file manipulation with practical code execution.
          </p>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="px-3.5 py-1 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{completedCount}/{totalCount} Modules Completed</span>
            </div>
            <div className="px-3.5 py-1 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{userProgress.bugsSolvedIds.length} Bugs Diagnosed</span>
            </div>
          </div>

          {/* Quote & Signatures */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-left items-end">
            <div>
              <p className="text-[11px] text-slate-500 italic">
                "C is quirky, flawed, and an enormous success."
              </p>
              <p className="text-[10px] font-bold text-slate-700 mt-0.5">
                — Dennis M. Ritchie, Creator of C
              </p>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-blue-900 font-serif">
                C-Guru Verification Seal
              </div>
              <p className="text-[11px] text-slate-500">Issued: {certDate}</p>
              <p className="text-[9px] font-mono text-slate-400">ID: CGURU-{user?.id || 'DEMO'}-{Date.now().toString(36).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'hi' ? 'सर्टिफिकेट प्रिंट / सेव करें' : 'Print / Save as PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
