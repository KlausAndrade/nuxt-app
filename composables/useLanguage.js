export const useLanguage = () => {
    const currentLanguage = useState('language', () => 'en');
  
    const toggleLanguage = async () => {
      const newLanguage = currentLanguage.value === 'en' ? 'dk' : 'en';
      currentLanguage.value = newLanguage;
  
      await $fetch('/api/language', {
        method: 'POST',
        body: { language: newLanguage },
      });
    };
  
    const fetchLanguage = async () => {
      const { language } = await $fetch('/api/language').catch(() => ({ language: 'en' }));
      currentLanguage.value = language;
    };
  
    return {
      currentLanguage,
      toggleLanguage,
      fetchLanguage,
    };
  };