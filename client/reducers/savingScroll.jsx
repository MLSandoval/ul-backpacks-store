// Saving scroll position.
  getSnapshotBeforeUpdate(prevProps) {
    const {
      history: { action },
      location: { pathname }
    } = prevProps;

    if (action !== "POP") {
      scrollData = { ...scrollData, [pathname]: window.pageYOffset };
    }

    return null;
  }

  // Restore scroll position.
  componentDidUpdate() {
    const {
      history: { action },
      location: { pathname }
    } = this.props;

    if (action === "POP") {
      if (scrollData[pathname]) {
        setTimeout(() =>
          window.scrollTo({
            left: 0,
            top: scrollData[pathname],
            behavior: "smooth"
          })
        );
      } else {
        setTimeout(window.scrollTo({ left: 0, top: 0 }));
      }
    } else {
      setTimeout(window.scrollTo({ left: 0, top: 0 }));
    }
  }