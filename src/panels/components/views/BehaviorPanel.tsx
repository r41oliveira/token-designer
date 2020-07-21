import React, { useEffect, useState } from "react";

import { Behavior } from "../../../ttf/core_pb";

import ArtifactInspector from "../inspectors/ArtifactInspector";
import { artifactPanelBaseEvents } from "../../artifactPanelBaseEvents";
import { behaviorPanelEvents } from "../../behaviorPanelEvents";
import { TaxonomyAsObjects } from "../../taxonomyAsObjects";
import ToolBoxTitle from "../ToolBoxTitle";

type Props = {
  postMessage: (message: any) => void;
};

export default function BehaviorPanel({ postMessage }: Props) {
  const [taxonomy, setTaxonomy] = useState<TaxonomyAsObjects | null>(null);
  const [artifact, setArtifact] = useState<Behavior.AsObject | null>(null);

  const handleMessage = (message: any) => {
    if (message.taxonomy) {
      console.log("Received taxonomy update", message.taxonomy);
      setTaxonomy(message.taxonomy);
    }
    if (message.artifact) {
      console.log("Received artifact update", message.artifact);
      setArtifact(message.artifact);
    }
  };

  useEffect(() => {
    window.addEventListener("message", (msg) => handleMessage(msg.data));
    postMessage({ e: artifactPanelBaseEvents.Init });
  }, []);

  if (artifact && taxonomy) {
    return (
      <>
        <ToolBoxTitle
          title={artifact.artifact?.name || ""}
          onRename={() => postMessage({ e: artifactPanelBaseEvents.Rename })}
        />
        <div style={{ margin: "var(--padding)", padding: "var(--padding)" }}>
          <ArtifactInspector
            taxonomy={taxonomy}
            artifact={artifact}
            artifactType="behavior"
          />
        </div>
      </>
    );
  } else {
    return <>Loading&hellip;</>;
  }
}
