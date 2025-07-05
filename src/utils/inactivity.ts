import { useAuthStore } from "../store/server/auth";
import { errorToast } from "./toast";

const INACTIVITY_LIMIT = 20 * 60 * 1000;
let timer: number | null = null;

function logoutForInactivity() {
  const store = useAuthStore();
  errorToast("Logged out due to inactivity");
  store.logout();
}

export function resetInactivityTimer() {
  const store = useAuthStore();
  if (!store.getAuthToken) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    return;
  }

  if (timer) clearTimeout(timer);

  timer = window.setTimeout(logoutForInactivity, INACTIVITY_LIMIT);
}

export function setupInactivityMonitor() {
  const events = [
    "mousemove",
    "mousedown",
    "touchstart",
    "click",
    "scroll",
    "keypress",
  ];
  const handler = () => resetInactivityTimer();
  events.forEach((e) => document.addEventListener(e, handler));
  resetInactivityTimer();

  return () => {
    events.forEach((e) => document.removeEventListener(e, handler));
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
}
