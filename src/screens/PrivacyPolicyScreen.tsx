import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createAppStyles } from '../styles';
import NavBar from '../components/NavBar';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({
  onBack,
}) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createAppStyles(colors), [colors]);

  return (
    <View style={styles.safe}>
      <View style={styles.screenContent}>
        <NavBar title="Privacy Policy" onBack={onBack} />
        <ScrollView
          style={styles.policyScroll}
          contentContainerStyle={styles.policyContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.policyTitle}>Privacy Policy</Text>
          <Text style={styles.policyUpdated}>Last updated: February 2026</Text>

          <View style={styles.policySection}>
            <Text style={styles.policySectionTitle}>1. Introduction</Text>
            <Text style={styles.policyBody}>
              Cineverse (“we”, “our”, or “the app”) is committed to protecting
              your privacy. This policy describes how we handle information when
              you use our mobile and web application.
            </Text>
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policySectionTitle}>
              2. Information We Collect
            </Text>
            <Text style={styles.policyBody}>
              Cineverse displays upcoming movie release information. We may
              fetch data from third-party APIs to show you release dates and
              related details. We do not collect personal data such as your
              name, email, or location. Any data processed is used solely to
              display content within the app.
            </Text>
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policySectionTitle}>3. Data Storage</Text>
            <Text style={styles.policyBody}>
              Theme and preference settings may be stored locally on your
              device. We do not transmit these preferences to external servers
              unless you use features that explicitly require it.
            </Text>
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policySectionTitle}>
              4. Third-Party Services
            </Text>
            <Text style={styles.policyBody}>
              The app may request data from external APIs (for example, to show
              release dates). Use of those services is subject to their
              respective privacy policies. We do not control and are not
              responsible for their practices.
            </Text>
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policySectionTitle}>5. Changes</Text>
            <Text style={styles.policyBody}>
              We may update this privacy policy from time to time. The “Last
              updated” date at the top will reflect the most recent version.
              Continued use of the app after changes constitutes acceptance of
              the updated policy.
            </Text>
          </View>

          <View style={styles.policySection}>
            <Text style={styles.policySectionTitle}>6. Contact</Text>
            <Text style={styles.policyBody}>
              If you have questions about this privacy policy, please contact us
              through the app’s support or feedback channels.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PrivacyPolicyScreen;
