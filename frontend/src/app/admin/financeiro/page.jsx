"use client"
import FinanceiroEntradas from "@/components/FinanceiroEntradas/FinanceiroEntradas";
import FinanceiroSaida from "@/components/FinanceiroSaída/FinanceiroSaida";
import FinanceiroFornecedor from "@/components/FinanceiroFornecedor/FinanceiroFornecedor";
import FinanceiroFuncionarios from "@/components/FinanceiroFuncionario/FinanceiroFuncionarios";
import FinanceiroFluxoCaixa from "@/components/FinanceiroFluxoCaixa/FinanceiroFluxoCaixa"
import "./ModuleFinanceiroAdm.css";

export default function Financeiro() {
 
  return (
    <>
<div className="FinanceiroInicial">
<FinanceiroFluxoCaixa/>
 </div>
 
<div className="FinanceiroDivisao">
<FinanceiroEntradas/>
</div>


<div className="FinanceiroDivisao">
  <FinanceiroSaida/>
</div>

<div className="FinanceiroDivisao">
<FinanceiroFornecedor/>
</div>

<div className="FinanceiroDivisao">
<FinanceiroFuncionarios/>
</div>
  

    </>
  );
}