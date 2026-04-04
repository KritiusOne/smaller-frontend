import { getURLByShortCode } from "@/src/service/urlService.server";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const url = await getURLByShortCode(slug, true);
  console.log(`URL fetched for slug ${slug}:`, url);
  if(!url){
    //TODO: build 404 page
    return (<div className="page-shell py-8 sm:py-10">
      <div className="mb-8 glass-panel px-6 py-7 sm:px-8">
        <p className="kicker">Enlace no encontrado</p>
        <h1 className="mt-2 text-3xl font-bold text-[#1a1919]">El enlace que buscas no existe</h1>
        <p className="mt-1 text-sm text-[#4f4a4a]">Es posible que el enlace haya sido eliminado o que el código sea incorrecto.</p>
      </div>
    </div>
    );
  }
  redirect(url.originalURL);
}