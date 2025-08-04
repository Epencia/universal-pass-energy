import React from 'react';
import { ScrollView, Text, StyleSheet, View, Image } from 'react-native';

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.mainTitle}>CONDITIONS GÉNÉRALES D'UTILISATION</Text>
      <Image source={require('../assets/icone carte.png')} style={styles.logo} />
      <Text style={[styles.warning, styles.paragraph]}>
        
        AVERTISSEMENT IMPORTANT : {'\n'}

        Ce document est une structure et un modèle générique de Conditions Générales d'Utilisation (CGU) à titre informatif uniquement. Il ne constitue en aucun cas un conseil juridique et ne remplace pas l'avis d'un professionnel du droit.
      </Text>
      <Text style={styles.paragraph}>
        La rédaction de CGU valides et conformes à la législation en vigueur en Côte d'Ivoire (notamment en matière de droit des contrats, droit de la consommation, droit des paiements électroniques, protection des données personnelles, et réglementation du secteur des hydrocarbures) est une tâche complexe qui doit impérativement être confiée à un avocat spécialisé.
      </Text>
      <Text style={styles.paragraph}>
        L'utilisation de ce modèle sans validation juridique pourrait exposer votre entreprise à des risques légaux importants.
      </Text>

      <SectionTitle title="CONDITIONS GÉNÉRALES D'UTILISATION (CGU) DE L'APPLICATION &quot;UNIVERSAL PASS ENERGY&quot;" />
      <Text style={styles.paragraph}>Date de dernière mise à jour : [Date à insérer]</Text>

      <SectionTitle title="Préambule" />
      <Text style={styles.paragraph}>
        La société Sachiel group SA, par exemple : Société à Responsabilité Limitée (SARL)], au capital social de 10 000 000, immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM) de ABIDJAN YAMOUSSOUKRO sous le numéro [Numéro RCCM CI-TDI-2024-B-289], dont le siège social est situé à [Yamoussoukro 225], représentée par N’DA, agissant en qualité de [Fonction], (ci-après désignée &quot;l'Éditeur&quot; ou &quot;Nous&quot;), édite et exploite l'application mobile et la plateforme web "Universal Pass Energy" (ci-après &quot;l'Application&quot;).
      </Text>
      <Text style={styles.paragraph}>
        L'Application a pour objet de faciliter l'achat de carburant dans un réseau de stations-service partenaires en Côte d'Ivoire grâce à un système de cartes carburant universelles prépayées.
      </Text>
      <Text style={styles.paragraph}>
        Les présentes Conditions Générales d'Utilisation (ci-après les &quot;CGU&quot;) ont pour objet de définir les modalités et conditions d'accès et d'utilisation de l'Application et des services qu'elle propose.
      </Text>
      <Text style={styles.paragraph}>
        Toute utilisation de l'Application implique l'acceptation pleine et entière des présentes CGU par l'Utilisateur. En cas de non-acceptation des CGU, l'Utilisateur doit cesser immédiatement toute utilisation de l'Application.
      </Text>

      <SectionTitle title="Article 1 : Définitions" />
      <Text style={styles.paragraph}>
        Aux fins des présentes CGU, les termes ci-après définis, qu'ils soient employés au singulier ou au pluriel, auront la signification suivante :
      </Text>
      <ListItem label="Application" description="Désigne l'application mobile &quot;Universal Pass Energy&quot; disponible sur les plateformes de téléchargement d'applications (App Store, Google Play Store) ainsi que la plateforme web associée, éditées par [Nom de votre entreprise]." />
      <ListItem label="Utilisateur" description="Toute personne physique ou morale qui télécharge, installe, accède ou utilise l'Application et les Services, qu'elle soit simple visiteur ou Client." />
      <ListItem label="Client" description="Utilisateur ayant créé un Compte Utilisateur sur l'Application et ayant souscrit aux Services proposés, notamment l'achat et le rechargement de la Carte Universal Pass Energy." />
      <ListItem label="Carte Universal Pass Energy" description="Désigne la carte physique ou dématérialisée, émise par l'Éditeur, permettant au Client d'acheter du carburant et des services associés auprès des Stations Partenaires, après avoir été rechargée." />
      <ListItem label="Station Partenaire" description="Désigne toute station-service ayant conclu un accord de partenariat avec l'Éditeur et acceptant la Carte Universal Pass Energy comme moyen de paiement pour le carburant et les services éligibles." />
      <ListItem label="Compte Utilisateur" description="Désigne l'espace personnel sécurisé créé par l'Utilisateur sur l'Application, permettant l'accès aux Services." />
      <ListItem label="Services" description="Désigne l'ensemble des fonctionnalités et prestations offertes par l'Éditeur via l'Application, incluant notamment l'achat, le rechargement et la gestion de la Carte Universal Pass Energy, la consultation du solde et de l'historique des transactions, et la localisation des Stations Partenaires." />
      <ListItem label="Rechargement" description="Opération consistant à créditer des fonds sur une Carte Universal Pass Energy." />
      <ListItem label="Solde" description="Montant des fonds disponibles sur la Carte Universal Pass Energy." />
      <ListItem label="Données Personnelles" description="Toute information se rapportant à une personne physique identifiée ou identifiable, conformément à la Loi n° 2013-451 du 19 juin 2013 relative à la protection des données à caractère personnel." />

      <SectionTitle title="Article 2 : Objet de l'Application et des Services" />
      <Text style={styles.paragraph}>
        L'Application &quot;Universal Pass Energy&quot; a pour objectif de fournir aux Utilisateurs un moyen de paiement pratique, sécurisé et universel pour l'achat de carburant et de services associés dans un réseau étendu de Stations Partenaires en Côte d'Ivoire.
      </Text>
      <Text style={styles.paragraph}>
        Les Services proposés par l'Application incluent, sans s'y limiter :
      </Text>
      <ListBullet text="L'achat et la commande de Cartes Universal Pass Energy." />
      <ListBullet text="Le rechargement des Cartes Universal Pass Energy par divers moyens de paiement." />
      <ListBullet text="La consultation en temps réel du Solde de la Carte Universal Pass Energy." />
      <ListBullet text="L'accès à l'historique détaillé des transactions effectuées avec la Carte." />
      <ListBullet text="La localisation des Stations Partenaires sur une carte interactive." />
      <ListBullet text="La gestion des informations du Compte Utilisateur." />
      <Text style={styles.paragraph}>
        L'Éditeur agit en tant qu'intermédiaire facilitant la transaction de paiement entre le Client et la Station Partenaire. L'Éditeur ne vend pas directement le carburant et n'est pas responsable de la qualité, de la quantité ou de la disponibilité du carburant ou des services fournis par les Stations Partenaires.
      </Text>

      <SectionTitle title="Article 3 : Création et Gestion du Compte Utilisateur" />
      <SubSectionTitle title="3.1. Conditions de création de Compte :" />
      <Text style={styles.paragraph}>
        L'accès à certains Services nécessite la création d'un Compte Utilisateur. La création d'un Compte est réservée aux personnes physiques majeures et capables juridiquement, ou aux personnes morales dûment représentées.
        L'Utilisateur s'engage à fournir des informations exactes, complètes et à jour lors de la création de son Compte (nom, prénom, adresse e-mail, numéro de téléphone, informations d'entreprise le cas échéant, etc.).
      </Text>

      <SubSectionTitle title="3.2. Identifiants de connexion :" />
      <Text style={styles.paragraph}>
        L'Utilisateur est seul responsable de la confidentialité de ses identifiants de connexion (adresse e-mail ou nom d'utilisateur et mot de passe). Toute connexion ou utilisation des Services effectuée à l'aide de ces identifiants sera réputée avoir été effectuée par l'Utilisateur. En cas de perte, vol ou utilisation non autorisée de ses identifiants, l'Utilisateur s'engage à en informer immédiatement l'Éditeur.
      </Text>

      <SubSectionTitle title="3.3. Mise à jour des informations :" />
      <Text style={styles.paragraph}>
        L'Utilisateur s'engage à maintenir à jour les informations de son Compte Utilisateur. L'Éditeur ne pourra être tenu responsable des conséquences résultant de la fourniture d'informations erronées, incomplètes ou non mises à jour.
      </Text>

      <SubSectionTitle title="3.4. Suspension et Résiliation du Compte :" />
      <Text style={styles.paragraph}>
        L'Éditeur se réserve le droit de suspendre ou de résilier le Compte Utilisateur, sans préavis ni indemnité, en cas de non-respect des présentes CGU, de fraude, de tentative de fraude, d'utilisation abusive ou illégale de l'Application ou des Services, ou pour toute autre raison légitime. Le Solde de la Carte Universal Pass Energy pourra être bloqué ou remboursé selon les conditions définies à l'Article 4.5.
      </Text>

      <SectionTitle title="Article 4 : Achat et Utilisation de la Carte Universal Pass Energy" />
      <SubSectionTitle title="4.1. Acquisition de la Carte :" />
      <Text style={styles.paragraph}>
        La Carte Universal Pass Energy peut être acquise via l'Application ou via d'autres canaux de distribution que l'Éditeur pourra mettre en place. Les modalités d'acquisition et les frais éventuels sont précisés lors de l'achat.
      </Text>

      <SubSectionTitle title="4.2. Rechargement de la Carte :" />
      <Text style={styles.paragraph}>
        Le Rechargement de la Carte s'effectue via l'Application, en utilisant les moyens de paiement proposés (carte bancaire, mobile money, etc.). Les montants minimum et maximum de Rechargement sont indiqués sur l'Application. Les fonds rechargés sont crédités sur la Carte après validation de la transaction de paiement.
      </Text>

      <SubSectionTitle title="4.3. Utilisation de la Carte en Station Partenaire :" />
      <Text style={styles.paragraph}>
        La Carte Universal Pass Energy permet de régler l'achat de carburant et des services éligibles (tels que définis par l'Éditeur) dans les Stations Partenaires. L'Utilisateur doit présenter sa Carte au personnel de la Station Partenaire ou l'insérer dans le terminal de paiement compatible. L'Utilisateur est responsable de la saisie correcte de son code PIN (si applicable) et de la vérification du montant de la transaction avant validation.
      </Text>

      <SubSectionTitle title="4.4. Consultation du Solde et Historique :" />
      <Text style={styles.paragraph}>
        Le Solde de la Carte et l'historique des transactions sont consultables à tout moment via le Compte Utilisateur sur l'Application.
      </Text>

      <SubSectionTitle title="4.5. Perte, Vol, Endommagement de la Carte et Remboursement :" />
      <Text style={styles.paragraph}>
        En cas de perte, vol ou endommagement de la Carte Universal Pass Energy, le Client doit en informer immédiatement l'Éditeur via l'Application ou le service client. L'Éditeur procédera au blocage de la Carte pour éviter toute utilisation frauduleuse. Une nouvelle carte pourra être émise selon les conditions et frais applicables.
      </Text>
      <Text style={styles.paragraph}>
        Les fonds rechargés sur la Carte Universal Pass Energy sont, par principe, non remboursables. Toute demande de remboursement exceptionnel sera étudiée au cas par cas et pourra être soumise à des frais de traitement et à un Solde minimum. Les conditions spécifiques de remboursement, si elles existent, seront détaillées sur l'Application.
      </Text>

      <SectionTitle title="Article 5 : Tarification et Frais" />
      <Text style={styles.paragraph}>
        L'accès à l'Application est gratuit. Cependant, l'utilisation de certains Services, notamment l'acquisition et le Rechargement de la Carte Universal Pass Energy, peut être soumise à des frais.
      </Text>
      <Text style={styles.paragraph}>
        Les tarifs applicables (frais d'émission de carte, frais de Rechargement, frais de remplacement de carte, etc.) sont clairement indiqués sur l'Application et/ou sur le site web de l'Éditeur.
      </Text>
      <Text style={styles.paragraph}>
        L'Éditeur se réserve le droit de modifier ses tarifs à tout moment. Toute modification tarifaire sera portée à la connaissance des Clients par notification via l'Application ou par e-mail, avec un préavis raisonnable avant son entrée en vigueur. L'Utilisateur qui n'accepterait pas les nouveaux tarifs pourra résilier son Compte selon les modalités de l'Article 3.4.
      </Text>

      <SectionTitle title="Article 6 : Responsabilités" />
      <SubSectionTitle title="6.1. Responsabilité de l'Utilisateur :" />
      <Text style={styles.paragraph}>
        L'Utilisateur est seul responsable de l'utilisation qu'il fait de l'Application et des Services, ainsi que de la Carte Universal Pass Energy. Il s'engage à utiliser l'Application de manière loyale, conformément aux présentes CGU, aux lois et réglementations en vigueur, et aux bonnes mœurs.
        L'Utilisateur est responsable de toutes les transactions effectuées avec sa Carte Universal Pass Energy, sauf en cas de perte ou vol dûment notifié selon l'Article 4.5.
      </Text>

      <SubSectionTitle title="6.2. Responsabilité de l'Éditeur :" />
      <Text style={styles.paragraph}>
        L'Éditeur s'engage à mettre en œuvre tous les moyens raisonnables pour assurer le bon fonctionnement de l'Application et la sécurité des transactions.
        Cependant, l'Éditeur ne saurait être tenu responsable des interruptions de service, pannes, erreurs, ou dysfonctionnements de l'Application ou des Services qui ne lui seraient pas directement imputables, notamment en cas de :
      </Text>
      <ListBullet text="Force majeure ou cas fortuit." />
      <ListBullet text="Dysfonctionnements des réseaux de communication ou d'Internet." />
      <ListBullet text="Problèmes techniques liés aux équipements de l'Utilisateur." />
      <ListBullet text="Actes de tiers ou de cyberattaques, malgré les mesures de sécurité mises en place." />
      <ListBullet text="Qualité, quantité ou disponibilité du carburant ou des services fournis par les Stations Partenaires." />
      <Text style={styles.paragraph}>
        La responsabilité de l'Éditeur est expressément limitée aux dommages directs et prévisibles résultant d'une faute prouvée de sa part dans l'exécution des Services. En aucun cas, l'Éditeur ne pourra être tenu responsable des dommages indirects, tels que la perte de profits, de clientèle, de données, ou tout autre préjudice financier ou commercial.
      </Text>

      <SectionTitle title="Article 7 : Protection des Données Personnelles" />
      <Text style={styles.paragraph}>
        L'Éditeur s'engage à collecter et traiter les Données Personnelles des Utilisateurs dans le respect de la Loi n° 2013-451 du 19 juin 2013 relative à la protection des données à caractère personnel.
      </Text>
      <Text style={styles.paragraph}>
        Les Données Personnelles collectées sont nécessaires à la création et à la gestion du Compte Utilisateur, à l'exécution des Services (achat, rechargement, historique de transactions), à la sécurité des transactions, et à l'amélioration de l'Application.
      </Text>
      <Text style={styles.paragraph}>
        Ces données peuvent être partagées avec les Stations Partenaires (uniquement les informations nécessaires à la validation de la transaction), les prestataires techniques de l'Éditeur, et les autorités compétentes en cas d'obligation légale.
      </Text>
      <Text style={styles.paragraph}>
        L'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de ses Données Personnelles, qu'il peut exercer en contactant l'Éditeur à l'adresse [Adresse e-mail de contact pour les données personnelles] ou via les fonctionnalités dédiées de l'Application.
      </Text>
      <Text style={styles.paragraph}>
        Pour plus de détails sur le traitement de vos Données Personnelles, veuillez consulter notre [Lien vers votre Politique de Confidentialité] disponible sur l'Application et notre site web.
      </Text>

      <SectionTitle title="Article 8 : Propriété Intellectuelle" />
      <Text style={styles.paragraph}>
        L'Application, son contenu (textes, images, graphiques, logos, icônes, sons, logiciels), les marques, les noms commerciaux, les logos et tous les éléments utilisés dans le cadre des Services sont la propriété exclusive de l'Éditeur ou de ses concédants de licence, et sont protégés par le droit de la propriété intellectuelle.
      </Text>
      <Text style={styles.paragraph}>
        Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments de l'Application, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'Éditeur.
      </Text>

      <SectionTitle title="Article 9 : Modifications des CGU" />
      <Text style={styles.paragraph}>
        L'Éditeur se réserve le droit de modifier les présentes CGU à tout moment, notamment pour s'adapter à l'évolution législative, réglementaire, jurisprudentielle ou technologique.
      </Text>
      <Text style={styles.paragraph}>
        Les modifications seront portées à la connaissance des Utilisateurs par notification via l'Application, par e-mail, ou par publication sur le site web de l'Éditeur, avec un préavis raisonnable avant leur entrée en vigueur.
      </Text>
      <Text style={styles.paragraph}>
        L'Utilisateur qui n'accepterait pas les modifications apportées aux CGU devra cesser d'utiliser l'Application et pourra résilier son Compte dans les conditions prévues à l'Article 3.4. Toute utilisation de l'Application après la date d'entrée en vigueur des modifications vaudra acceptation des nouvelles CGU.
      </Text>

      <SectionTitle title="Article 10 : Droit Applicable et Règlement des Litiges" />
      <Text style={styles.paragraph}>
        Les présentes CGU sont régies par le droit ivoirien.
      </Text>
      <Text style={styles.paragraph}>
        En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGU, les parties s'engagent à rechercher une solution amiable.
      </Text>
      <Text style={styles.paragraph}>
        À défaut de résolution amiable, le litige sera porté devant les tribunaux compétents d'[Indiquer la ville ou la juridiction compétente, par exemple : Abidjan, Côte d'Ivoire].
      </Text>

      <SectionTitle title="Article 11 : Dispositions Générales" />
      <SubSectionTitle title="11.1. Non-validité partielle :" />
      <Text style={styles.paragraph}>
        Si une ou plusieurs stipulations des présentes CGU sont tenues pour non valides ou déclarées telles en application d'une loi, d'un règlement ou à la suite d'une décision définitive d'une juridiction compétente, les autres stipulations garderont toute leur force et leur portée.
      </Text>

      <SubSectionTitle title="11.2. Non-renonciation :" />
      <Text style={styles.paragraph}>
        Le fait pour l'Éditeur de ne pas se prévaloir à un moment donné d'une stipulation des présentes CGU ne peut être interprété comme une renonciation à se prévaloir ultérieurement de ladite stipulation.
      </Text>

      <SubSectionTitle title="11.3. Intégralité de l'accord :" />
      <Text style={styles.paragraph}>
        Les présentes CGU constituent l'intégralité de l'accord entre l'Utilisateur et l'Éditeur concernant l'utilisation de l'Application et des Services, et annulent et remplacent toutes communications ou propositions antérieures, orales ou écrites.
      </Text>

      <SectionTitle title="Contact :" />
      <Text style={styles.paragraph}>
        Pour toute question relative aux présentes CGU ou à l'Application, vous pouvez nous contacter à l'adresse suivante :
      </Text>
      <Text style={styles.paragraph}>
        [Adresse e-mail de contact]{'\n'}
        [Numéro de téléphone de contact]{'\n'}
        [Adresse postale (facultatif)]
      </Text>
      <View style={{height: 50}} />
    </ScrollView>
  );
};

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const SubSectionTitle = ({ title }) => (
  <Text style={styles.subSectionTitle}>{title}</Text>
);

const ListItem = ({ label, description }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemLabel}>{label}:</Text>
    <Text style={styles.listItemDescription}>{description}</Text>
  </View>
);

const ListBullet = ({ text }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bulletSymbol}>•</Text>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  logo: {
    height: 70,
    left: 40,
    width: 70,
    },
  mainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
    textAlign: 'center',
    borderRadius: 20,
    borderColor: '#c6ff00',
    padding: 10,
    height: 50,
    borderWidth: 1,
    backgroundColor: '#c6ff00',
  },
  warning: {
    color: '#B00020',
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subSectionTitle: {
    marginTop: 16,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#444',
  },
  paragraph: {
    fontSize: 15,
    marginTop: 8,
    color: '#555',
    lineHeight: 21,
  },
  listItem: {
    marginTop: 8,
    paddingLeft: 12,
  },
  listItemLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  listItemDescription: {
    fontSize: 15,
    color: '#555',
    marginTop: 2,
    paddingLeft: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    marginTop: 6,
    paddingLeft: 14,
  },
  bulletSymbol: {
    fontSize: 16,
    lineHeight: 22,
    marginRight: 6,
    color: '#222',
  },
  bulletText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
    flexShrink: 1,
  },
});

export default TermsAndConditions;

