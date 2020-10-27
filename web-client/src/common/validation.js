const commonValidation = {
  methods: {
    validateObject(testObject) {
      return (
        typeof testObject === "object" &&
        testObject !== null &&
        Object.keys(testObject).length > 0
      );
    },
  },
};

export default commonValidation;
