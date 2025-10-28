import { ConfigProvider, theme, Modal } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
import { ConsentProvider, useConsent } from './context/ConsentContext';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import TravelDeclarationForm from './components/TravelDeclarationForm';
import ConsentScreen from './components/ConsentScreen';
import SubmittedRecords from './components/SubmittedRecords';
import './theme/global-theme.css';
import './App.css';

function AppContent() {
  const { theme: customTheme } = useTheme();
  const { hasConsented, setConsent } = useConsent();
  
  // Convert our custom theme to Ant Design theme
  const antdTheme = {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: customTheme.primary.main,
      colorPrimaryHover: customTheme.primary.light,
      colorPrimaryActive: customTheme.primary.dark,
      colorSuccess: customTheme.primary.main,
      colorSuccessHover: customTheme.primary.light,
      colorSuccessActive: customTheme.primary.dark,
      colorWarning: customTheme.secondary.main,
      colorWarningHover: customTheme.secondary.light,
      colorWarningActive: customTheme.secondary.dark,
      colorError: customTheme.accent.main,
      colorErrorHover: customTheme.accent.light,
      colorErrorActive: customTheme.accent.dark,
      colorBgContainer: customTheme.background.paper,
      colorBgLayout: customTheme.background.default,
      colorText: customTheme.text.primary,
      colorTextSecondary: customTheme.text.secondary,
      colorBorder: customTheme.border.default,
      colorBorderSecondary: customTheme.border.light,
      borderRadius: 6,
    },
    components: {
      Button: {
        primaryColor: customTheme.primary.main,
        primaryShadow: `0 2px 0 ${customTheme.primary.dark}`,
      },
      Card: {
        colorBgContainer: customTheme.background.paper,
        colorBorderSecondary: customTheme.border.light,
      },
      Steps: {
        colorPrimary: customTheme.primary.main,
        colorText: customTheme.text.primary,
      },
      Form: {
        labelColor: customTheme.text.primary,
      },
      Alert: {
        colorSuccess: customTheme.primary.main,
        colorWarning: customTheme.secondary.main,
        colorError: customTheme.accent.main,
      },
      Message: {
        colorSuccess: customTheme.primary.main,
        colorWarning: customTheme.secondary.main,
        colorError: customTheme.accent.main,
      },
      Notification: {
        colorSuccess: customTheme.primary.main,
        colorWarning: customTheme.secondary.main,
        colorError: customTheme.accent.main,
      },
    },
  };

  const handleConsent = () => {
    setConsent(true);
  };

  const handleDecline = () => {
    Modal.confirm({
      title: 'Consent Required',
      content: 'You must provide consent to use this application. Without consent, you cannot proceed with the travel health declaration.',
      okText: 'I Understand',
      cancelText: 'Exit App',
      onOk: () => {
        // User understands but still doesn't consent - they can try again
      },
      onCancel: () => {
        // User wants to exit - could redirect to external site or show message
        window.close();
      },
    });
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <Router>
        <div className="App" style={{ 
          backgroundColor: customTheme.background.default,
          color: customTheme.text.primary 
        }}>
          <AppHeader />
          <main className="app-main">
            <Routes>
              {/* Admin routes - no consent required */}
              <Route path="/admin" element={<Navigate to="/admin/records" replace />} />
              <Route path="/admin/records" element={<SubmittedRecords />} />
              
              {/* Public routes - consent required */}
              <Route path="/" element={
                !hasConsented ? (
                  <ConsentScreen 
                    onConsent={handleConsent}
                    onDecline={handleDecline}
                  />
                ) : (
                  <TravelDeclarationForm />
                )
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <AppFooter />
        </div>
      </Router>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ConsentProvider>
        <AppContent />
      </ConsentProvider>
    </ThemeProvider>
  );
}

export default App;
