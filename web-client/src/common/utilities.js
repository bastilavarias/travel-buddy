import numberFormatter from "number-formatter";
import moment from "moment";

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
    formatItineraryDetails(days) {
      const dayCount = [...new Set(days.map((day) => day.day))].length;
      const destinationCount = days.map((day) => day.destination).length;
      const activityCount = days
        .map((day) => day.activities)
        .map((activities) => activities.length)
        .reduce((flat, next) => flat + next, 0);
      return `${dayCount} ${
        dayCount > 1 ? "Days" : "Day"
      }, ${destinationCount} ${
        destinationCount > 1 ? "Destinations" : "Destination"
      }, and ${activityCount} ${
        activityCount > 1 ? "Activities" : "Activity"
      }.`;
    },
    formatMoney(money) {
      return money > 0 ? numberFormatter("₱ #,###.00", money) : `₱ 0.00`;
    },
    formatPaxLabel(pax) {
      return this.pax > 1 ? `${pax} Persons` : `${pax} Person`;
    },
    formatDate(date) {
      return moment(new Date(date)).format("MMM Do YYYY") || "N/a";
    },
    formatDateFromNow(date) {
      return moment(new Date(date)).format("MMM Do [at] h:mm a") || "N/a";
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    debounce(fn, delay) {
      let timeoutID = null;
      return function () {
        clearTimeout(timeoutID);
        let args = arguments;
        let that = this;
        timeoutID = setTimeout(function () {
          fn.apply(that, args);
        }, delay);
      };
    },
  },

  mounted() {
    this.scroll();
  },
};

export default commonUtilities;
