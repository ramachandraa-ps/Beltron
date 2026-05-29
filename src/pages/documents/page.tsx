import { useState, useMemo } from "react";
import { useLang } from "@/lib/language-context.tsx";
import {
  allDocuments,
  documentCategories,
  documentDepartments,
  documentYears,
} from "@/lib/documents-data.ts";
import type { DocumentCategory, DocumentItem } from "@/lib/documents-data.ts";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  File,
  FolderArchive,
  Calendar,
  Building2,
  Filter,
  ArrowUpDown,
  Eye,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";
import AnimatedPage from "@/components/animated-page.tsx";

const categoryIcons: Record<DocumentCategory, React.ReactNode> = {
  "Annual Report": <FileText className="w-4 h-4" />,
  Form: <File className="w-4 h-4" />,
  Circular: <FileText className="w-4 h-4" />,
  Policy: <FileText className="w-4 h-4" />,
  Manual: <FileText className="w-4 h-4" />,
  "Tender Document": <FileSpreadsheet className="w-4 h-4" />,
};

const categoryColors: Record<DocumentCategory, string> = {
  "Annual Report": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Form: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  Circular: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Policy: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Manual: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "Tender Document": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
};

const fileTypeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="w-5 h-5 text-red-500" />,
  XLSX: <FileSpreadsheet className="w-5 h-5 text-green-600" />,
  DOCX: <File className="w-5 h-5 text-blue-600" />,
  ZIP: <FolderArchive className="w-5 h-5 text-amber-600" />,
};

type SortField = "date" | "downloads" | "title";
type SortDirection = "asc" | "desc";

function DocumentDetail({ doc, onBack }: { doc: DocumentItem; onBack: () => void }) {
  const { lang } = useLang();

  const handleDownload = () => {
    toast.success(
      lang === "hi"
        ? `"${doc.titleHi}" डाउनलोड शुरू हो रहा है`
        : `Downloading "${doc.title}"`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.25 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-primary font-semibold mb-5 hover:underline cursor-pointer"
      >
        <X className="w-4 h-4" />
        {lang === "hi" ? "सूची पर वापस जाएं" : "Back to documents"}
      </button>

      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-lg bg-secondary">
            {fileTypeIcons[doc.fileType]}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground mb-1">
              {lang === "hi" ? doc.titleHi : doc.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", categoryColors[doc.category])}>
                {doc.category}
              </span>
              <span>{doc.fileType} • {doc.fileSize}</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{lang === "hi" ? "विभाग:" : "Department:"}</span>
            <span className="font-medium">{doc.department}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{lang === "hi" ? "प्रकाशित:" : "Published:"}</span>
            <span className="font-medium">{new Date(doc.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Download className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{lang === "hi" ? "डाउनलोड:" : "Downloads:"}</span>
            <span className="font-medium">{doc.downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{lang === "hi" ? "वर्ष:" : "Year:"}</span>
            <span className="font-medium">{doc.year}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            {lang === "hi" ? "विवरण" : "Description"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {lang === "hi" ? doc.descriptionHi : doc.description}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          {lang === "hi" ? `डाउनलोड करें (${doc.fileType}, ${doc.fileSize})` : `Download ${doc.fileType} (${doc.fileSize})`}
        </button>
      </div>
    </motion.div>
  );
}

function DocumentCard({ doc, onClick }: { doc: DocumentItem; onClick: () => void }) {
  const { lang } = useLang();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(
      lang === "hi"
        ? `"${doc.titleHi}" डाउनलोड शुरू हो रहा है`
        : `Downloading "${doc.title}"`
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-secondary flex-shrink-0 group-hover:bg-primary/10 transition-colors">
          {fileTypeIcons[doc.fileType]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {lang === "hi" ? doc.titleHi : doc.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", categoryColors[doc.category])}>
              {doc.category}
            </span>
            <span className="text-[10px] text-muted-foreground">{doc.department}</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(doc.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {doc.downloads.toLocaleString()}
              </span>
              <span>{doc.fileType} • {doc.fileSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onClick}
                className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title={lang === "hi" ? "विवरण देखें" : "View details"}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                title={lang === "hi" ? "डाउनलोड" : "Download"}
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DocumentsPage() {
  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | "All">("All");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<number | "All">("All");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredDocuments = useMemo(() => {
    let docs = [...allDocuments];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.titleHi.includes(search) ||
          d.department.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      docs = docs.filter((d) => d.category === selectedCategory);
    }

    // Department filter
    if (selectedDepartment !== "All") {
      docs = docs.filter((d) => d.department === selectedDepartment);
    }

    // Year filter
    if (selectedYear !== "All") {
      docs = docs.filter((d) => d.year === selectedYear);
    }

    // Sort
    docs.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") {
        cmp = new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
      } else if (sortField === "downloads") {
        cmp = a.downloads - b.downloads;
      } else {
        cmp = a.title.localeCompare(b.title);
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

    return docs;
  }, [search, selectedCategory, selectedDepartment, selectedYear, sortField, sortDir]);

  const totalDownloads = allDocuments.reduce((sum, d) => sum + d.downloads, 0);

  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {lang === "hi" ? "दस्तावेज़ डाउनलोड केंद्र" : "Document Download Center"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "hi"
              ? "सभी आधिकारिक दस्तावेज़, फॉर्म, नीतियां और मैनुअल एक ही स्थान पर"
              : "Access all official documents, forms, policies, and manuals in one place"}
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-primary">{allDocuments.length}</p>
            <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "कुल दस्तावेज़" : "Total Documents"}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-primary">{documentCategories.length}</p>
            <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "श्रेणियां" : "Categories"}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-primary">{totalDownloads.toLocaleString()}</p>
            <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "कुल डाउनलोड" : "Total Downloads"}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-primary">{documentDepartments.length}</p>
            <p className="text-[11px] text-muted-foreground">{lang === "hi" ? "विभाग" : "Departments"}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedDoc ? (
            <DocumentDetail key="detail" doc={selectedDoc} onBack={() => setSelectedDoc(null)} />
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Search and filters */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                  {/* Search input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={lang === "hi" ? "दस्तावेज़ खोजें..." : "Search documents..."}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      data-search-input
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer",
                      showFilters
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-secondary"
                    )}
                  >
                    <Filter className="w-4 h-4" />
                    {lang === "hi" ? "फ़िल्टर" : "Filters"}
                  </button>
                </div>

                {/* Expanded filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 mt-4 border-t border-border">
                        {/* Category */}
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            {lang === "hi" ? "श्रेणी" : "Category"}
                          </label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as DocumentCategory | "All")}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm cursor-pointer"
                          >
                            <option value="All">{lang === "hi" ? "सभी" : "All Categories"}</option>
                            {documentCategories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        {/* Department */}
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            {lang === "hi" ? "विभाग" : "Department"}
                          </label>
                          <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm cursor-pointer"
                          >
                            <option value="All">{lang === "hi" ? "सभी" : "All Departments"}</option>
                            {documentDepartments.map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>

                        {/* Year */}
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            {lang === "hi" ? "वर्ष" : "Year"}
                          </label>
                          <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value === "All" ? "All" : Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm cursor-pointer"
                          >
                            <option value="All">{lang === "hi" ? "सभी" : "All Years"}</option>
                            {documentYears.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>

                        {/* Sort */}
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">
                            {lang === "hi" ? "क्रम" : "Sort By"}
                          </label>
                          <div className="flex gap-1.5">
                            <select
                              value={sortField}
                              onChange={(e) => setSortField(e.target.value as SortField)}
                              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm cursor-pointer"
                            >
                              <option value="date">{lang === "hi" ? "तिथि" : "Date"}</option>
                              <option value="downloads">{lang === "hi" ? "डाउनलोड" : "Downloads"}</option>
                              <option value="title">{lang === "hi" ? "शीर्षक" : "Title"}</option>
                            </select>
                            <button
                              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                              className="px-2.5 py-2 rounded-lg border border-border bg-background hover:bg-secondary transition-colors cursor-pointer"
                              title={sortDir === "asc" ? "Ascending" : "Descending"}
                            >
                              <ArrowUpDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category quick filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
                    selectedCategory === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  )}
                >
                  {lang === "hi" ? "सभी" : "All"} ({allDocuments.length})
                </button>
                {documentCategories.map((cat) => {
                  const count = allDocuments.filter((d) => d.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer",
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      )}
                    >
                      {categoryIcons[cat]}
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Results count */}
              <p className="text-xs text-muted-foreground mb-4">
                {lang === "hi"
                  ? `${filteredDocuments.length} दस्तावेज़ मिले`
                  : `${filteredDocuments.length} document${filteredDocuments.length !== 1 ? "s" : ""} found`}
              </p>

              {/* Document grid */}
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    {lang === "hi"
                      ? "कोई दस्तावेज़ नहीं मिला। कृपया अपने फ़िल्टर बदलें।"
                      : "No documents found. Try adjusting your filters."}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-3">
                  <AnimatePresence mode="popLayout">
                    {filteredDocuments.map((doc) => (
                      <DocumentCard key={doc.id} doc={doc} onClick={() => setSelectedDoc(doc)} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  );
}
