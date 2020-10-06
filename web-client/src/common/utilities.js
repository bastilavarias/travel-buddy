const CommonUtilities = {
  data() {
    return {
      isScrollingDown: false,
    };
  },

  methods: {
    scroll() {
      window.onscroll = () => {
        if (window.pageYOffset > 5) {
          this.isScrollingDown = true;
          return;
        }
        this.isScrollingDown = false;
      };
    },
  },

  mounted() {
    this.scroll();
  },
};

export default CommonUtilities;
