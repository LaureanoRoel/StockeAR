import { useQuery } from "@tanstack/react-query";
import { 
  useAuthStore, 
  useProductosStore, 
  ProductosTemplate,
  SpinnerLoader 
} from "../index";

export function Productos() {
  const { user } = useAuthStore();
  // La página busca la función "mostrarProductos" aquí
  const { mostrarProductos, productos } = useProductosStore();

  if (!user) {
    return <SpinnerLoader />;
  }
  
  const id_empresa = user.empresa.id;

  const { isLoading, error } = useQuery({
    queryKey: ["productos", id_empresa],
    queryFn: () => mostrarProductos({ id_empresa: id_empresa }),
    enabled: !!id_empresa,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }
  
  if (error) {
    return <span>Error al cargar los productos: {error.message}</span>;
  }

  return <ProductosTemplate data={productos} />;
}