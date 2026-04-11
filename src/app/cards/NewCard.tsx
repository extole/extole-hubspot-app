import {
  Divider,
  Flex,
  Text,
  hubspot,
} from '@hubspot/ui-extensions';

hubspot.extend<'crm.record.sidebar'>(({ context }) => (
  <ExtoleContactCard properties={context.crm.objectProperties} />
));

function ExtoleContactCard({ properties }: { properties: Record<string, string> }) {
  const hubspotutk = properties['extole_hubspotutk'];
  const advocateCode = properties['extole_advocate_code'];
  const hasReferralData = !!hubspotutk || !!advocateCode;

  return (
    <Flex direction="column" gap="small">
      <Text format={{ fontWeight: 'bold' }}>Extole Referral</Text>

      {!hasReferralData && (
        <Text>No referral data captured for this contact.</Text>
      )}

      {advocateCode && (
        <Flex direction="row" gap="small" justifyContent="space-between">
          <Text format={{ fontWeight: 'bold' }}>Referred by</Text>
          <Text>{advocateCode}</Text>
        </Flex>
      )}

      {hubspotutk && (
        <>
          {advocateCode && <Divider />}
          <Flex direction="row" gap="small" justifyContent="space-between">
            <Text format={{ fontWeight: 'bold' }}>Session ID</Text>
            <Text>{hubspotutk.slice(0, 16)}…</Text>
          </Flex>
        </>
      )}
    </Flex>
  );
}
