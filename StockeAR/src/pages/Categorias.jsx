
import { useQuery } from "@tanstack/react-query";
import {
  CategoriasTemplate,
  SpinnerLoader,
  useCategoriasStore,
  useAuthStore, 
} from "../index";

export function Categorias() {
  const { mostrarcategorias, datacategorias } = useCategoriasStore();
  const { user } = useAuthStore();

  if (!user) {
    return <SpinnerLoader />;
  }
  const id_empresa = user.empresa.id;

  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", id_empresa],
    queryFn: () => mostrarcategorias({ id_empresa: id_empresa }),
    enabled: !!id_empresa,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <CategoriasTemplate data={datacategorias} />;
}