const commonUtilities = {
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
    goBack() {
      this.$router.go(-1);
    },
    formatName(firstName, lastName) {
      return `${firstName} ${lastName}`;
    },
  },

  mounted() {
    this.scroll();
  },
};

export default commonUtilities;
