import { Card, CardHeader, CardBody, Input, Textarea, Button } from "@heroui/react";

export default function AnamneseDetails({ anamnese, onOpen }: any) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <h3 className="text-lg font-bold">Anamnese</h3>
      </CardHeader>
      <CardBody>
        {anamnese ? (
          <div className="space-y-4">
            <Input label="CID" value={anamnese.cid} isReadOnly />
            <Textarea
              label="Queixa Principal"
              value={anamnese.queixa_principal || ""}
              isReadOnly
            />
            <Textarea
              label="História da Doença Atual"
              value={anamnese.historia_doenca_atual || ""}
              isReadOnly
            />
            <Textarea
              label="Antecedentes Pessoais"
              value={anamnese.antecedentes_pessoais || ""}
              isReadOnly
            />
            <Textarea
              label="Antecedentes Familiares"
              value={anamnese.antecedentes_familiares || ""}
              isReadOnly
            />
            <Textarea
              label="Hábitos de Vida"
              value={anamnese.habitos_vida || ""}
              isReadOnly
            />
            <Textarea
              label="Medicamentos em Uso"
              value={anamnese.medicamentos_em_uso || ""}
              isReadOnly
            />
            <Textarea
              label="Alergias"
              value={anamnese.alergias || ""}
              isReadOnly
            />
            <Textarea
              label="Cirurgias Prévias"
              value={anamnese.cirurgias_previas || ""}
              isReadOnly
            />
            <Textarea
              label="Observações"
              value={anamnese.observacoes || ""}
              isReadOnly
            />
          </div>
        ) : (
          <div>
            <p>Nenhuma anamnese encontrada para esta consulta.</p>
            <Button color="primary" onPress={onOpen}>
              Adicionar Anamnese
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
