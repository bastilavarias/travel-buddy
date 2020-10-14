import VueCookie from "vue-cookie";
import jwtDecode from "jwt-decode";

const tokenService = {
  save(token) {
    VueCookie.set("token", token);
  },

  get() {
    const token = VueCookie.get("token");
    return token ? token : "";
  },

  remove() {
    VueCookie.delete("token");
  },

  decode() {
    return jwtDecode(this.get());
  },
};

export default tokenService;
