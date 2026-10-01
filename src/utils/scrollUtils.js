/**
 * Ultra-Smooth Momentum Scrolling Utility with Lenis
 */
export const smoothScrollTo = (target, offset = -85) => {
  if (typeof window === 'undefined') return;

  // If target is top or 0
  if (target === 0 || target === 'top') {
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 1.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  // If target is an element ID string
  const targetId = typeof target === 'string' && target.startsWith('#') ? target.substring(1) : target;
  const element = typeof target === 'string' ? document.getElementById(targetId) : target;

  if (window.lenis && element) {
    window.lenis.scrollTo(element, {
      offset,
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (element) {
    const y = element.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0) + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
