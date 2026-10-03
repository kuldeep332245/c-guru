import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  FolderArchive,
  Terminal,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Upload,
  Loader2,
  HelpCircle,
  Key,
  FolderOpen
} from 'lucide-react';
import JSZip from 'jszip';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  lang: 'hi' | 'en';
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
  isDark,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'zip' | 'terminal'>('mobile');
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [showTokenHelp, setShowTokenHelp] = useState<boolean>(false);

  // Mobile direct GitHub upload state
  const [ghUsername, setGhUsername] = useState<string>('kuldeep0203singh');
  const [ghRepo, setGhRepo] = useState<string>('c-guru');
  const [ghToken, setGhToken] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatusText, setUploadStatusText] = useState<string>('');
  const [uploadSuccessUrl, setUploadSuccessUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  if (!isOpen) return null;

  const terminalCommands = `# 1. Extracted folder me terminal kholein
git init
git add .
git commit -m "Initial commit: C-Guru C Programming Platform"
git branch -M main

# 2. Apne GitHub repo ka URL yahan dalein
git remote add origin https://github.com/${ghUsername.trim() || '<YOUR_USERNAME>'}/${ghRepo.trim() || 'c-guru'}.git

# 3. Code upload karein
git push -u origin main`;

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(terminalCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleDirectDownload = () => {
    const link = document.createElement('a');
    link.href = '/c-guru-source-code.zip';
    link.download = 'c-guru-source-code.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Direct Mobile Push via GitHub API
  const handleStartMobileUpload = async () => {
    const username = ghUsername.trim();
    const repo = ghRepo.trim();
    const token = ghToken.trim();

    if (!username) {
      setUploadError(lang === 'hi' ? 'कृपया अपना GitHub Username दर्ज करें!' : 'Please enter your GitHub Username');
      return;
    }
    if (!repo) {
      setUploadError(lang === 'hi' ? 'कृपया Repository का नाम दर्ज करें!' : 'Please enter Repository Name');
      return;
    }
    if (!token) {
      setUploadError(
        lang === 'hi'
          ? 'कृपया GitHub Token दर्ज करें! (ऊपर नीले "Token बनाएं" बटन पर क्लिक करके 10 सेकंड में टोकन मिल जाएगा)'
          : 'Please enter GitHub Personal Access Token'
      );
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessUrl(null);
    setUploadProgress(5);
    setUploadStatusText(lang === 'hi' ? 'प्रोजेक्ट की फाइलें तैयार की जा रही हैं...' : 'Preparing project files...');

    try {
      // 1. Fetch the zip from server
      const zipRes = await fetch('/c-guru-source-code.zip');
      if (!zipRes.ok) throw new Error('Source code archive not found');
      const blob = await zipRes.blob();
      
      setUploadProgress(15);
      setUploadStatusText(lang === 'hi' ? 'फाइलों को प्रोसेस किया जा रहा है...' : 'Processing file contents...');
      const zip = await JSZip.loadAsync(blob);

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      };

      // 2. Check or create repo
      setUploadProgress(25);
      setUploadStatusText(lang === 'hi' ? 'GitHub रिपॉजिटरी चेक की जा रही है...' : 'Checking GitHub repository...');
      
      let repoCheck = await fetch(`https://api.github.com/repos/${username}/${repo}`, { headers });
      
      if (repoCheck.status === 404) {
        setUploadProgress(30);
        setUploadStatusText(lang === 'hi' ? `नई रिपॉजिटरी '${repo}' बनाई जा रही है...` : `Creating repository '${repo}'...`);
        
        const createRes = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: repo,
            description: 'C-Guru: Interactive C Programming Platform (Hindi & English)',
            private: false,
            auto_init: true
          })
        });

        if (!createRes.ok) {
          const errData = await createRes.json().catch(() => ({}));
          throw new Error(
            errData.message || (lang === 'hi' ? 'रिपॉजिटरी नहीं बन सकी। कृपया अपना टोकन और स्कोप (repo) चेक करें।' : 'Failed to create repository. Check token permissions.')
          );
        }

        // Wait 1.5s for GitHub to initialize branch
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } else if (!repoCheck.ok) {
        const errData = await repoCheck.json().catch(() => ({}));
        throw new Error(
          errData.message === 'Bad credentials'
            ? (lang === 'hi' ? 'गलत टोकन (Bad credentials)! कृपया नया टोकन बनाकर सही पेस्ट करें।' : 'Invalid token! Please provide a valid GitHub token.')
            : (errData.message || 'GitHub से कनेक्ट नहीं हो सका।')
        );
      }

      // 3. Collect non-directory files
      const fileList: { path: string; file: JSZip.JSZipObject }[] = [];
      zip.forEach((path, file) => {
        if (!file.dir) {
          fileList.push({ path, file });
        }
      });

      const totalFiles = fileList.length;
      if (totalFiles === 0) throw new Error('कोई फाइल नहीं मिली!');

      // Determine default branch
      let defaultBranch = 'main';
      try {
        const brRes = await fetch(`https://api.github.com/repos/${username}/${repo}/branches/main`, { headers });
        if (!brRes.ok) {
          const brMaster = await fetch(`https://api.github.com/repos/${username}/${repo}/branches/master`, { headers });
          if (brMaster.ok) defaultBranch = 'master';
        }
      } catch {
        defaultBranch = 'main';
      }

      // 4. Upload files with progress
      let count = 0;
      for (const item of fileList) {
        const base64Content = await item.file.async('base64');

        // Check if file exists to get sha
        let fileSha: string | undefined;
        try {
          const getRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${item.path}?ref=${defaultBranch}`, { headers });
          if (getRes.ok) {
            const data = await getRes.json();
            fileSha = data.sha;
          }
        } catch {
          // New file
        }

        const putBody: {
          message: string;
          content: string;
          branch: string;
          sha?: string;
        } = {
          message: `Add ${item.path}`,
          content: base64Content,
          branch: defaultBranch
        };
        if (fileSha) putBody.sha = fileSha;

        const putRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${item.path}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(putBody)
        });

        if (!putRes.ok) {
          const errRes = await putRes.json().catch(() => ({}));
          console.warn(`Error uploading ${item.path}:`, errRes);
        }

        count++;
        const pct = Math.round(35 + (count / totalFiles) * 60);
        setUploadProgress(pct);
        setUploadStatusText(
          lang === 'hi'
            ? `फ़ाइल अपलोड हो रही है (${count}/${totalFiles}): ${item.path}`
            : `Uploading (${count}/${totalFiles}): ${item.path}`
        );
      }

      setUploadProgress(100);
      setUploadStatusText(lang === 'hi' ? 'सफलतापूर्वक पूरा हुआ! 🎉' : 'Upload completed successfully! 🎉');
      setUploadSuccessUrl(`https://github.com/${username}/${repo}`);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'अपलोड में कोई त्रुटि आई। कृपया पुनः प्रयास करें।');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div
        className={`w-full max-w-2xl my-auto rounded-3xl p-5 sm:p-7 shadow-2xl relative border overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr from-blue-600 to-indigo-700 shadow-md shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {lang === 'hi' ? 'GitHub पर मोबाइल से अपलोड करें' : 'Upload to GitHub from Mobile'}
              </h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
                Mobile Special
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'hi'
                ? 'मोबाइल में ZIP extract या फोल्डर अपलोड करने का कोई झंझट नहीं! सीधा यहीं से भेजें।'
                : 'No need to unzip or struggle with mobile folder upload. Push directly from here!'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={`grid grid-cols-3 rounded-xl p-1 mb-5 border gap-1 text-xs font-bold ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'mobile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'मोबाइल डायरेक्ट' : 'Mobile 1-Click'}</span>
          </button>
          <button
            onClick={() => setActiveTab('zip')}
            className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'zip'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'ZIP गाइड' : 'ZIP Guide'}</span>
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`py-2 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-center ${
              activeTab === 'terminal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{lang === 'hi' ? 'PC / Terminal' : 'PC Commands'}</span>
          </button>
        </div>

        {/* TAB 1: Mobile Direct Upload */}
        {activeTab === 'mobile' && (
          <div className="space-y-4">
            <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold text-blue-400">
                    {lang === 'hi' ? 'मोबाइल में ZIP क्यों नहीं खुल रही?' : 'Why ZIP fails on mobile?'}
                  </span>
                  <p className="text-slate-300 mt-0.5">
                    {lang === 'hi'
                      ? 'मोबाइल के Chrome से GitHub पर पूरा फोल्डर अपलोड नहीं हो सकता। इसीलिए हमने यह डायरेक्ट फीचर बनाया है — बिना किसी ZIP डाउनलोड या Extract के, सारा असली कोड सीधे आपके GitHub पर पहुँच जाएगा!'
                      : 'Mobile Chrome cannot upload nested folder trees. This direct uploader pushes all 34 files with full structure directly into your GitHub account!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Success Card */}
            {uploadSuccessUrl && (
              <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-200 space-y-3 animate-in zoom-in-95">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>{lang === 'hi' ? 'बधाई हो भाई! प्रोजेक्ट GitHub पर सफलतापूर्वक अपलोड हो गया!' : 'Success! Your project is live on GitHub!'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'hi'
                    ? 'आपकी रिपॉजिटरी में src, components, README.md और सारा कोड फोल्डर स्ट्रक्चर के साथ लाइव है।'
                    : 'All components, tutorials, README and configuration are now in your repo.'}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={uploadSuccessUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md"
                  >
                    <span>{lang === 'hi' ? 'अपनी GitHub Repo खोलें' : 'View on GitHub'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
                  >
                    <span>{lang === 'hi' ? 'Vercel पर 1-Click में Live करें' : 'Deploy to Vercel'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Inputs Form */}
            {!uploadSuccessUrl && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      {lang === 'hi' ? '1. आपका GitHub Username' : '1. GitHub Username'}
                    </label>
                    <input
                      type="text"
                      value={ghUsername}
                      onChange={(e) => setGhUsername(e.target.value)}
                      placeholder="e.g. kuldeep0203singh"
                      disabled={isUploading}
                      className={`w-full px-3 py-2 text-xs rounded-xl border font-mono outline-none transition-all ${
                        isDark ? 'bg-slate-950 border-slate-800 focus:border-blue-500 text-white' : 'bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      {lang === 'hi' ? '2. रिपॉजिटरी का नाम' : '2. Repository Name'}
                    </label>
                    <input
                      type="text"
                      value={ghRepo}
                      onChange={(e) => setGhRepo(e.target.value)}
                      placeholder="c-guru"
                      disabled={isUploading}
                      className={`w-full px-3 py-2 text-xs rounded-xl border font-mono outline-none transition-all ${
                        isDark ? 'bg-slate-950 border-slate-800 focus:border-blue-500 text-white' : 'bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Key className="w-3 h-3 text-amber-400" />
                      <span>{lang === 'hi' ? '3. GitHub Personal Access Token' : '3. GitHub Personal Access Token'}</span>
                    </label>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=C-Guru-Upload"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 underline"
                    >
                      <span>{lang === 'hi' ? '🔗 1-Click में Token बनाएं' : 'Create Token (1-Click)'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <input
                    type="password"
                    value={ghToken}
                    onChange={(e) => setGhToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    disabled={isUploading}
                    className={`w-full px-3 py-2 text-xs rounded-xl border font-mono outline-none transition-all ${
                      isDark ? 'bg-slate-950 border-slate-800 focus:border-blue-500 text-white' : 'bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900'
                    }`}
                  />

                  {/* Help accordion */}
                  <div className="mt-1.5">
                    <button
                      type="button"
                      onClick={() => setShowTokenHelp(!showTokenHelp)}
                      className="text-[11px] text-slate-400 hover:text-slate-200 inline-flex items-center gap-1 font-semibold"
                    >
                      <HelpCircle className="w-3 h-3 text-blue-400" />
                      <span>{lang === 'hi' ? 'टोकन कैसे निकालें? (सिर्फ 15 सेकंड का काम - गाइड देखें)' : 'How to get token in 15 seconds?'}</span>
                    </button>

                    {showTokenHelp && (
                      <div className={`mt-2 p-3 rounded-xl border text-xs space-y-1.5 leading-relaxed ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                        <p className="font-bold text-blue-400">📱 मोबाइल में टोकन निकालने के 3 सरल कदम:</p>
                        <ol className="list-decimal list-inside space-y-1 text-[11px]">
                          <li>
                            ऊपर दिए नीले <strong>"🔗 1-Click में Token बनाएं"</strong> पर क्लिक करें। (अगर लॉगिन नहीं हैं तो GitHub लॉगिन करें)।
                          </li>
                          <li>
                            पेज खुलेगा जिसमें <code>repo</code> पहले से सेलेक्ट होगा। सीधे पेज के सबसे नीचे जाएं और हरा बटन <strong>"Generate token"</strong> दबाएं।
                          </li>
                          <li>
                            स्क्रीन पर जो <code>ghp_...</code> कोड दिखेगा, उसके बगल के कॉपी बटन पर टैप करके यहाँ पेस्ट कर दें!
                          </li>
                        </ol>
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Banner */}
                {uploadError && (
                  <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>{uploadError}</div>
                  </div>
                )}

                {/* Progress bar */}
                {isUploading && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                        <span>{uploadStatusText}</span>
                      </span>
                      <span className="font-mono font-bold text-blue-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleStartMobileUpload}
                  disabled={isUploading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === 'hi' ? 'GitHub पर कोड भेजा जा रहा है...' : 'Uploading Code to GitHub...'}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>{lang === 'hi' ? '🚀 मोबाइल से सीधे GitHub पर कोड अपलोड करें' : 'Upload Directly to GitHub'}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ZIP Download & Mobile Extraction Guide */}
        {activeTab === 'zip' && (
          <div className="space-y-4">
            {/* Download Button */}
            <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                  <FolderArchive className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-white">c-guru-source-code.zip</div>
                  <p className="text-[11px] text-slate-400">Complete Code + README + Configs (34 Files)</p>
                </div>
              </div>
              <button
                onClick={handleDirectDownload}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'ZIP डाउनलोड करें' : 'Download ZIP'}</span>
              </button>
            </div>

            {/* Mobile Unzip Guide */}
            <div className={`p-4 rounded-2xl border space-y-3 text-xs ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-sm text-amber-400 flex items-center gap-1.5">
                <FolderOpen className="w-4 h-4" />
                <span>{lang === 'hi' ? '📱 मोबाइल में ZIP File Extract कैसे करें?' : 'How to Extract ZIP on Mobile:'}</span>
              </div>

              <div className="space-y-2.5 text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p>
                    {lang === 'hi'
                      ? 'डाउनलोड होने के बाद ऊपर की नोटिफिकेशन पर क्लिक न करें (क्योंकि फोन उसे डॉक्यूमेंट की तरह खोलने की कोशिश करता है और एरर देता है)।'
                      : 'Do not click directly on the download notification.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p>
                    {lang === 'hi'
                      ? 'अपने फोन का'
                      : 'Open your phone\'s'}{' '}
                    <strong className="text-white">"Files by Google"</strong>{' '}
                    {lang === 'hi' ? 'या' : 'or'}{' '}
                    <strong className="text-white">"File Manager / My Files"</strong>{' '}
                    {lang === 'hi' ? 'ऐप खोलें और' : 'app and go to'}{' '}
                    <strong className="text-white">"Downloads"</strong>{' '}
                    {lang === 'hi' ? 'फोल्डर में जाएं।' : 'folder.'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p>
                    {lang === 'hi'
                      ? 'वहाँ'
                      : 'Tap on'}{' '}
                    <strong className="text-white">c-guru-source-code.zip</strong>{' '}
                    {lang === 'hi'
                      ? 'पर टैप करें। नीचे'
                      : 'and select'}{' '}
                    <strong className="text-emerald-400">"Extract" (निकालें)</strong>{' '}
                    {lang === 'hi'
                      ? 'का बटन आएगा, उसे दबा दें! सारा कोड एक फोल्डर में बाहर आ जाएगा।'
                      : 'to extract the files into a new folder.'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
                ⚠️ <strong>नोट:</strong> अगर मोबाइल Chrome से GitHub पर फोल्डर अपलोड नहीं हो पा रहा है, तो पहले टैब <strong>"📱 मोबाइल डायरेक्ट"</strong> का उपयोग करें — वह 1 क्लिक में सारा कोड बिना अनज़िप किए चढ़ा देता है!
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Terminal Commands */}
        {activeTab === 'terminal' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                {lang === 'hi' ? 'प्रोजेक्ट फोल्डर में Git Terminal / CMD खोलकर चलाएं:' : 'Run inside the project folder:'}
              </span>
              <button
                onClick={handleCopyCommands}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#070A12] overflow-hidden">
              <pre className="p-3.5 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                <code>{terminalCommands}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`mt-5 pt-3.5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
          <div className="flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Real Code: src, React 19, TypeScript, C Tutorials & Compiler</span>
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl border font-semibold text-xs ${isDark ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {lang === 'hi' ? 'बंद करें (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
