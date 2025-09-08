"use client";

import { Button, Group } from "@mantine/core";

interface StatOptionProps {
  statKey: string;
  statLabel: string;
  score: Score;
  handleStat: (statName: string) => Promise<void>;
}

export default function StatOption(props: StatOptionProps) {
  const { statKey, statLabel, score, handleStat } = props;

  const stats = score.stats;
  const currentStat = stats.find((s) => s.key === statKey);

  if (currentStat)
    return (
      <div>
        <Group justify="space-between">
          <>
            {statLabel}: {currentStat.value}
          </>
          <Button
            variant="filled"
            size="compact-xs"
            color="indigo"
            disabled={currentStat.value > 0}
            onClick={async () => await handleStat(statKey)}
          >
            {currentStat.pokemon ?? "CHOOSE"}
          </Button>
        </Group>
      </div>
    );
}
