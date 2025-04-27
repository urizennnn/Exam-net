const toast = useToast();

export function successToast(message: string) {
  toast.add({
    title: "Success",
    description: message,
    color: "success",
    ui: {
      root: "bg-white",
      title: "text-black",
      description: "text-gray-900",
    },
  });
}

export function errorToast(message: string) {
  toast.add({
    title: "Error",
    description: message,
    color: "error",
    ui: {
      root: "bg-white",
      title: "text-black",
      description: "text-gray-900",
    },
  });
}
