import React, { useState } from "react";
import {
  Button,
  Flex,
  LoadingSpinner,
  Tag,
  Text,
  hubspot,
} from "@hubspot/ui-extensions";

hubspot.extend<"crm.record.tab">(({ context, runServerlessFunction }) => (
  <Extension runServerlessFunction={runServerlessFunction} />
));

type TestResult = {
  ok: boolean;
  count?: number;
  status?: number;
  reachable?: boolean;
  error?: string;
};

type SpikeResults = {
  hubspot_crm_api: TestResult;
  extole_external_api: TestResult;
};

const ResultRow = ({ label, result }: { label: string; result: TestResult | null }) => {
  if (!result) return null;
  return (
    <Flex direction="row" gap="sm" alignItems="center">
      <Tag variant={result.ok ? "success" : "error"}>
        {result.ok ? "PASS" : "FAIL"}
      </Tag>
      <Text>
        {label}
        {result.error ? ` — ${result.error}` : ""}
        {result.count !== undefined ? ` — ${result.count} contacts fetched` : ""}
        {result.status !== undefined ? ` — HTTP ${result.status}` : ""}
      </Text>
    </Flex>
  );
};

const Extension = ({ runServerlessFunction }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SpikeResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSpike = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const { response, error: fnError } = await runServerlessFunction({
        name: "extole_hs_spike_app_function",
        parameters: {},
        propertiesToSend: [],
      });
      if (fnError) {
        setError(fnError.message ?? String(fnError));
      } else {
        setResults(response);
      }
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="md">
      <Text format={{ fontWeight: "bold" }}>Extole Architecture Spike</Text>
      <Text>
        Validates that HubSpot serverless functions can reach the HubSpot CRM
        API and an external host (Extole).
      </Text>
      <Button onClick={runSpike} disabled={loading}>
        {loading ? "Running…" : "Run Spike Test"}
      </Button>
      {loading && <LoadingSpinner label="Running spike tests…" />}
      {error && <Text format={{ fontWeight: "bold" }}>Error: {error}</Text>}
      {results && (
        <Flex direction="column" gap="sm">
          <ResultRow label="HubSpot CRM API" result={results.hubspot_crm_api} />
          <ResultRow label="Extole external API" result={results.extole_external_api} />
        </Flex>
      )}
    </Flex>
  );
};
