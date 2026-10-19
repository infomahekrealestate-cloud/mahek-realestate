import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ProjectEnquiryModal from './components/ProjectEnquiryModal';
import ImageLightboxModal from './components/ImageLightboxModal';
import SearchModal from './components/SearchModal';
import FloatingActions from './components/FloatingActions';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [enquiryProject, setEnquiryProject] = useState(null);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    src: '',
    title: '',
    subtitle: '',
    images: [],
    initialIndex: 0
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeFilters] = useState(null);

  // Deep-linking: On page load or popstate with ?project=slug or ?article=id, seamlessly redirect
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const projectId = params.get('project');
      if (projectId && (location.pathname === '/' || location.pathname === '/projects')) {
        navigate(`/project/${projectId}`, { replace: true });
        return;
      }
      const articleId = params.get('article');
      if (articleId && location.pathname === '/') {
        navigate(`/blog/${articleId}`, { replace: true });
        return;
      }
    } catch {
      // Ignored
    }
  }, [location, navigate]);

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToProjects = () => {
    if (location.pathname !== '/') {
      navigate('/projects');
    } else {
      const projectsElem = document.getElementById('projects');
      if (projectsElem) {
        projectsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenLightbox = (src, title, subtitle, images = null, initialIndex = 0) => {
    setLightboxState({
      isOpen: true,
      src,
      title: title || 'Project Architectural View',
      subtitle: subtitle || 'Mahek Real Estate Profile',
      images: images || (src ? [{ url: src, title, subtitle }] : []),
      initialIndex
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState({ isOpen: false, src: '', title: '', subtitle: '', images: [], initialIndex: 0 });
  };

  return (
    <div className="min-h-screen bg-white text-[#1f2937] relative selection:bg-[#c59b27] selection:text-white flex flex-col justify-between">
      {/* Navigation Bar */}
      <Navbar
        onOpenContact={scrollToContact}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Multipage Main Body */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onEnquire={(proj) => setEnquiryProject(proj)}
                activeFilters={activeFilters}
                scrollToContact={scrollToContact}
                scrollToProjects={scrollToProjects}
              />
            }
          />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectDetailsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route path="/news/:id" element={<BlogDetailsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/terms" element={<DisclaimerPage />} />
          <Route path="/disclosures" element={<DisclaimerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Global Footer */}
      <Footer onOpenContact={scrollToContact} />

      {/* Global Project Enquiry Modal (for quick CTA inquiries across cards) */}
      <ProjectEnquiryModal
        isOpen={Boolean(enquiryProject)}
        project={enquiryProject}
        onClose={() => setEnquiryProject(null)}
        initialInterest="Request Project Details & Availability"
      />

      {/* Global Architectural Layout Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxState.isOpen}
        imageSrc={lightboxState.src}
        title={lightboxState.title}
        subtitle={lightboxState.subtitle}
        images={lightboxState.images}
        initialIndex={lightboxState.initialIndex}
        onClose={handleCloseLightbox}
      />

      {/* Global Search Modal - Navigates directly to project details page */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProject={(selectedProject) => {
          setSearchModalOpen(false);
          if (selectedProject) {
            navigate(`/project/${selectedProject.slug || selectedProject.id}`);
          }
        }}
      />

      {/* Floating Chat & Scroll Actions */}
      <FloatingActions onOpenContact={scrollToContact} />
    </div>
  );
}

export default App;
