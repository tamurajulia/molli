"use client"
import FinanceiroEntradasMatriz from "@/components/FinanceiroEntradasMatriz/FinanceiroEntradasMatriz";
import FinanceiroSaida from "@/components/FinanceiroSaídaMatriz/FinanceiroSaidaMatriz";
import FinanceiroFornecedor from "@/components/FinanceiroFornecedorMatriz/FinanceiroFornecedorMatriz";
import FinanceiroFuncionarios from "@/components/FinanceiroFuncionarioMatriz/FinanceiroFuncionariosMatriz";
import FinanceiroFluxoCaixa from "@/components/FinanceiroFluxoCaixaMatriz/FinanceiroFluxoCaixaMatriz"
import "./ModuleFinanceiroMatriz.css";
import Chart from "@/components/Charts/charts";

export default function Financeiro() {
 
  return (
    <>
 
<div className="FinanceiroInicial">
<FinanceiroFluxoCaixa/>
 </div>
 <Chart />
<div className="FinanceiroDivisao">
<FinanceiroEntradasMatriz/>
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