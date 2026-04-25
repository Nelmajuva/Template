export class RoutingUtil {
  static scrollToTop = (): void => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
}
