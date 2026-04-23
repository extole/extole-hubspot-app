import {
  Flex,
  Text,
  hubspot,
} from '@hubspot/ui-extensions';

hubspot.extend<'crm.record.sidebar'>(({ context }) => (
  <ExtoleContactCard properties={context.crm.objectProperties} />
));

function ExtoleContactCard({ properties }: { properties: Record<string, string> }) {
  const advocateCode = properties['extole_advocate_code'];

  return (
    <Flex direction="column" gap="small">
      <Text format={{ fontWeight: 'bold' }}>Extole Referral</Text>

      {!advocateCode && (
        <Text>No referral data captured for this contact.</Text>
      )}

      {advocateCode && (
        <Flex direction="row" gap="small" justifyContent="space-between">
          <Text format={{ fontWeight: 'bold' }}>Referred by</Text>
          <Text>{advocateCode}</Text>
        </Flex>
      )}
    </Flex>
  );
}
