"use client";

import "@xyflow/react/dist/style.css";
import {
  Background,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  getBezierPath,
  Handle,
  Position,
  ReactFlow,
  useNodesState,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useEffect, useMemo, useState } from "react";
import type { Texto as TextoC } from "@/content/tipos";
import { MEDIDAS, TRAMO, type Flujo, type Nodo } from "@/lib/flujos";
import { encendidos, NodoFlujo, type EtiquetasFlujo } from "./LienzoFlujo";

type DatosNodo = { n: Nodo; nombre: TextoC; e: EtiquetasFlujo; t: number | undefined; animar: boolean; ciclo: number };
type DatosArista = { herramienta: boolean; inicio?: number; duracion: number; verde: boolean; animar: boolean; ciclo: number };

const tam = (n: Nodo) =>
  n.tipo === "agente" ? { w: MEDIDAS.agenteAncho, h: MEDIDAS.agenteAlto } : n.tipo === "herramienta" ? { w: MEDIDAS.herramienta, h: MEDIDAS.herramienta } : { w: MEDIDAS.nodo, h: MEDIDAS.nodo };

const puerto = "!size-2.5 !border-[1.5px] !border-texto-sec !bg-superficie";

function NodoReact({ data }: NodeProps<Node<DatosNodo>>) {
  const { n } = data;
  const { w, h } = tam(n);
  return (
    <div style={{ width: w, height: h }}>
      {n.tipo !== "disparador" && n.tipo !== "herramienta" && <Handle type="target" position={Position.Left} className={puerto} />}
      {n.tipo === "herramienta" && <Handle type="target" position={Position.Top} className={puerto} />}
      {n.tipo === "si" ? (
        <>
          <Handle id="si" type="source" position={Position.Right} className={puerto} style={{ top: 20 }} />
          <Handle id="no" type="source" position={Position.Right} className={puerto} style={{ top: 52 }} />
        </>
      ) : (
        n.tipo !== "herramienta" && <Handle type="source" position={Position.Right} className={puerto} />
      )}
      {n.tipo === "agente" && <Handle id="herr" type="source" position={Position.Bottom} className={puerto} />}
      <div key={data.ciclo} className="size-full">
        <NodoFlujo n={n} nombre={data.nombre} e={data.e} t={data.t} animar={data.animar} />
      </div>
    </div>
  );
}

function AristaReact({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps<Edge<DatosArista>>) {
  const [d] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const a = data!;
  return (
    <>
      <BaseEdge path={d} style={{ stroke: "var(--barra-suave)", strokeWidth: a.herramienta ? 1.6 : 2, strokeDasharray: a.herramienta ? "5 4" : undefined }} />
      {a.verde && (
        <path
          key={a.ciclo}
          d={d}
          pathLength={1}
          fill="none"
          stroke="#12A150"
          strokeWidth={2.4}
          className={a.animar ? "trazo-ok" : ""}
          style={a.animar ? { animationDelay: `${a.inicio}s`, animationDuration: `${a.duracion}s` } : undefined}
        />
      )}
      {a.animar && a.inicio !== undefined && (
        <EdgeLabelRenderer>
          <span
            key={a.ciclo}
            aria-hidden="true"
            className={`punto-flujo ${a.herramienta ? "punto-herramienta" : ""}`}
            style={{ offsetPath: `path("${d}")`, animationDelay: `${a.inicio}s`, animationDuration: `${a.duracion}s`, zIndex: 5 }}
          />
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const tiposNodo = { flujo: NodoReact };
const tiposArista = { flujo: AristaReact };

type Props = { flujo: Flujo; nombres: TextoC[]; e: EtiquetasFlujo; animar: boolean };

/** Flujo interactivo con React Flow: se pueden mover los nodos, acercar y alejar; el punto de luz lo recorre en bucle. */
export function FlujoReact({ flujo, nombres, e, animar }: Props) {
  const [ciclo, setCiclo] = useState(0);
  const h = useMemo(() => encendidos(flujo), [flujo]);
  useEffect(() => {
    if (!animar) return;
    const id = setInterval(() => setCiclo((c) => c + 1), (h.total + 1.6) * 1000);
    return () => clearInterval(id);
  }, [animar, h.total]);

  const nodos: Node<DatosNodo>[] = useMemo(
    () =>
      flujo.nodos.map((n, i) => {
        const { w, h: alto } = tam(n);
        return {
          id: String(i),
          type: "flujo",
          position: { x: n.x - w / 2, y: n.y - alto / 2 },
          data: { n, nombre: nombres[i], e, t: h.lit(i), animar, ciclo },
        };
      }),
    [flujo, nombres, e, h, animar, ciclo],
  );
  // Estado propio de React Flow (posición al arrastrar, medidas); los datos de animación se renuevan en cada ciclo.
  const [estado, , alCambiar] = useNodesState<Node<DatosNodo>>(nodos);
  const conPosicion = estado.map((n, i) => ({ ...n, data: nodos[i].data }));

  const aristas: Edge<DatosArista>[] = flujo.conexiones.map((c, i) => {
    const k = flujo.camino.indexOf(i);
    const herr = h.herramientas.get(c.a);
    return {
      id: `e${i}`,
      type: "flujo",
      source: String(c.de),
      target: String(c.a),
      sourceHandle: c.herramienta ? "herr" : c.salida ?? null,
      data: {
        herramienta: !!c.herramienta,
        verde: k >= 0 || (!!c.herramienta && herr !== undefined),
        inicio: k >= 0 ? h.salidas[k] : herr,
        duracion: k >= 0 ? TRAMO : 0.35,
        animar,
        ciclo,
      },
    };
  });

  return (
    <ReactFlow
      nodes={conPosicion}
      edges={aristas}
      nodeTypes={tiposNodo}
      edgeTypes={tiposArista}
      onNodesChange={alCambiar}
      fitView
      fitViewOptions={{ padding: 0.12 }}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      preventScrolling={false}
      minZoom={0.3}
      maxZoom={1.8}
      className="flujo-react"
    >
      <Background gap={18} size={1.2} color="var(--hero-puntos)" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}
