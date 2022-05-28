export default function basicUUID() {
    return window.URL.createObjectURL(new Blob([])).substring(31);
}
