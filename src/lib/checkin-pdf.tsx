import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottom: 2,
    borderBottomColor: '#E60023',
    paddingBottom: 16,
    marginBottom: 24,
  },
  hotelName: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 4,
    color: '#242424',
  },
  hotelSub: {
    fontSize: 9,
    color: '#9A9A9A',
    letterSpacing: 3,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#242424',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F7F3EE',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#9A9A9A',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    color: '#9A9A9A',
    width: 140,
  },
  value: {
    fontSize: 10,
    color: '#1A1A1A',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 48,
    right: 48,
    borderTop: 1,
    borderTopColor: '#E8E3DE',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 8,
    color: '#9A9A9A',
  },
})

interface Guest {
  name: string
  surname: string
  birthDate: string
  birthPlace: string
  nationality: string
  documentType: string
  documentNumber: string
  documentIssueDate: string
  documentExpiry: string
  documentAuthority: string
}

interface CheckInPdfProps {
  arrivalDate: string
  departureDate: string
  roomNumber?: string
  bookingCode?: string
  mainGuest: Guest
  additionalGuests?: Guest[]
}

function GuestSection({ guest, title }: { guest: Guest; title: string }) {
  const docTypeMap: Record<string, string> = {
    carta_identita: "Carta d'Identità",
    passaporto: 'Passaporto',
    patente: 'Patente di Guida',
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {[
        { label: 'Nome e Cognome', value: `${guest.name} ${guest.surname}` },
        { label: 'Data di Nascita', value: guest.birthDate },
        { label: 'Luogo di Nascita', value: guest.birthPlace },
        { label: 'Nazionalità', value: guest.nationality },
        { label: 'Tipo Documento', value: docTypeMap[guest.documentType] ?? guest.documentType },
        { label: 'N° Documento', value: guest.documentNumber },
        { label: 'Data Rilascio', value: guest.documentIssueDate },
        { label: 'Data Scadenza', value: guest.documentExpiry },
        { label: 'Autorità Rilascio', value: guest.documentAuthority },
      ].map(({ label, value }) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  )
}

export function CheckInPdf({
  arrivalDate,
  departureDate,
  roomNumber,
  bookingCode,
  mainGuest,
  additionalGuests = [],
}: CheckInPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.hotelName}>ALMA HOTEL</Text>
          <Text style={styles.hotelSub}>PALERMO · VIA MARIANO STABILE, 136</Text>
        </View>

        <Text style={styles.title}>Riepilogo Web Check-In</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dati Soggiorno</Text>
          {[
            { label: 'Data Arrivo', value: arrivalDate },
            { label: 'Data Partenza', value: departureDate },
            ...(roomNumber ? [{ label: 'N° Camera', value: roomNumber }] : []),
            ...(bookingCode ? [{ label: 'Codice Prenotazione', value: bookingCode }] : []),
          ].map(({ label, value }) => (
            <View key={label} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        <GuestSection guest={mainGuest} title="Ospite Principale" />

        {additionalGuests.map((guest, i) => (
          <GuestSection key={i} guest={guest} title={`Ospite ${i + 2}`} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Alma Hotel Palermo · Via Mariano Stabile, 136 · 90139 Palermo
            {'\n'}
            CIN: IT082053A1NPDY6DP · CIR: 19082053A301094
            {'\n'}
            Documento generato automaticamente il {new Date().toLocaleDateString('it-IT')}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
