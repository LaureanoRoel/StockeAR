import { useQuery } from "@tanstack/react-query";

import { HomeTemplate, useAuthStore, useEmpresaStore, SpinnerLoader } from "../index";

export function Home() {

  const { user } = useAuthStore();
  const { contarusuariosXempresa } = useEmpresaStore();


  if (!user) {
  
    return <SpinnerLoader />;
  }

 
  const id_empresa = user.empresa.id;

  const { data: count, isLoading } = useQuery({
    queryKey: ["contar usuarios por empresa", { idempresa: id_empresa }],
    queryFn: () => contarusuariosXempresa({ id_empresa: id_empresa }),
    
    enabled: !!id_empresa, 
  });

  
  return <HomeTemplate countusuarios={count} />;
}