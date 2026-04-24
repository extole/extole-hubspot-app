import {
  Flex,
  Link,
  Text,
  LoadingSpinner,
  hubspot,
} from '@hubspot/ui-extensions';
import { useState, useEffect } from 'react';

function truncateUrl(url: string, max = 32): string {
  const s = url.replace(/^https?:\/\//, '');
  return s.length > max ? s.slice(0, max) + '…' : s;
}

hubspot.extend<'crm.record.sidebar'>(({ runServerlessFunction, context }) => (
  <ExtoleContactCard
    objectId={context.crm.objectId}
    runServerlessFunction={runServerlessFunction}
  />
));

function ExtoleContactCard({
  objectId,
  runServerlessFunction,
}: {
  objectId: number;
  runServerlessFunction: (opts: any) => Promise<any>;
}) {
  const [advocateCode, setAdvocateCode] = useState<string | null | undefined>(undefined);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    runServerlessFunction({
      name: 'extole_settings',
      parameters: { action: 'getContactCard', objectId },
      propertiesToSend: [],
    }).then((res: any) => {
      const r = res?.response;
      if (r?.error) {
        setFetchError(r.error);
        setAdvocateCode(null);
      } else {
        setAdvocateCode(r?.advocateCode ?? null);
        setShareLink(r?.shareLink ?? null);
      }
    }).catch((err: any) => {
      setFetchError(String(err));
      setAdvocateCode(null);
    });
  }, [objectId]);

  if (advocateCode === undefined && !fetchError) {
    return <LoadingSpinner label="Loading" />;
  }

  if (fetchError) {
    return <Text>Error loading referral data: {fetchError}</Text>;
  }

  if (!advocateCode && !shareLink) {
    return <Text>No referral data captured for this contact.</Text>;
  }

  return (
    <Flex direction="column" gap="extra-small">
      {advocateCode && (
        <Flex direction="row" gap="small" justifyContent="space-between">
          <Text format={{ fontWeight: 'bold' }}>Referred by</Text>
          <Text>{advocateCode}</Text>
        </Flex>
      )}
      {shareLink && (
        <Flex direction="row" gap="small" justifyContent="space-between">
          <Text format={{ fontWeight: 'bold' }}>Share link</Text>
          <Link href={shareLink}>{truncateUrl(shareLink)}</Link>
        </Flex>
      )}
    </Flex>
  );
}
