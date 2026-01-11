const createSha = async (password: string) => {
  const encoder = new TextEncoder();
  const uIntArray = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", uIntArray);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
};
export default createSha;
