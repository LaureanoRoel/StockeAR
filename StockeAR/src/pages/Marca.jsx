import { useQuery } from "@tanstack/react-query";
import { 
  useAuthStore, 
  useMarcaStore, 
  MarcaTemplate,
  SpinnerLoader 
} from "../index";

export function Marca() {
  const { user } = useAuthStore();
  const { mostrarmarcas, datamarcas, buscarMarca, buscador } = useMarcaStore();

  if (!user) {
    return <SpinnerLoader />;
  }
  
  const id_empresa = user.empresa.id;

  const { isLoading, error } = useQuery({
    queryKey: ["marcas", id_empresa],
    queryFn: () => mostrarmarcas({ id_empresa: id_empresa }),
    enabled: !!id_empresa,
  });

  useQuery({
    queryKey: ["buscar marca", { id_empresa, descripcion: buscador }],
    queryFn: () => buscarMarca({ id_empresa, descripcion: buscador }),
    enabled: !!(id_empresa && buscador),
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  
  if (error) {
    return <span>Error al cargar las marcas.</span>;
  }

  return <MarcaTemplate data={datamarcas} />;
}