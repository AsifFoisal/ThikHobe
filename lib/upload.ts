import { apiRequest } from "@/lib/api/client"

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error("The image could not be read."))
    reader.readAsDataURL(file)
  })
}

export async function uploadImage(file: File) {
  const image = await readAsDataUrl(file)
  const data = await apiRequest<{ success: boolean; url: string }>("/api/uploads", {
    method: "POST",
    body: { image },
  })
  return data.url
}
