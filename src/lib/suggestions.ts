interface Alert {
    id: string;
    title: string;
    category: string;
    description: string;
    pond: string;
    location: string;
    timestamp: Date;
    currentValue: string;
    threshold: string;
    priority: 'critical' | 'warning' | 'info';
    status: 'active' | 'unacknowledged' | 'resolved';
    recommendedActions: string[];
  }

  interface SmartSuggestion {
      text: string;
      priority: 'Immediate' | 'Recommended' | 'Optional';
      action?: {
          type: 'link' | 'button';
          target: string;
          label: string;
      }
  }
  
  export const getSmartSuggestions = (alert: Alert): SmartSuggestion[] => {
    const suggestions: SmartSuggestion[] = [];
  
    if (alert.priority === 'critical') {
      switch (alert.title) {
        case 'Low Oxygen Level':
          suggestions.push({
              text: `Oxygen is at ${alert.currentValue}, which is critically low. Activate emergency aeration systems in ${alert.location}.`,
              priority: 'Immediate',
              action: { type: 'button', target: 'activate_aerator', label: 'Activate Aerator' }
          });
          suggestions.push({
              text: `A partial water change (20%) in ${alert.pond} can quickly boost oxygen levels.`,
              priority: 'Recommended'
          });
          suggestions.push({
              text: `Check maintenance logs for the main pump and aerator for ${alert.pond}.`,
              priority: 'Optional',
              action: { type: 'link', target: `/ponds/${alert.pond}/maintenance`, label: 'View Logs' }
          });
          break;
        case 'pH Level Spike':
            suggestions.push({
                text: `pH has spiked to ${alert.currentValue}. Administer pH down solution to ${alert.pond} immediately.`,
                priority: 'Immediate',
                action: { type: 'button', target: 'administer_ph_down', label: 'Administer Solution' }
            });
            suggestions.push({
                text: 'Check the dosing pump for calibration errors.',
                priority: 'Recommended'
            });
          break;
      }
    } else if (alert.priority === 'warning') {
        switch (alert.title) {
            case 'High Temperature':
                suggestions.push({
                    text: `Temperature has reached ${alert.currentValue}. Deploy shade cloths over ${alert.pond}.`,
                    priority: 'Recommended'
                });
                suggestions.push({
                    text: 'Increase surface water circulation to promote evaporative cooling.',
                    priority: 'Recommended'
                });
                break;
            case 'Low Feed Level':
            case 'Low Battery':
                suggestions.push({
                    text: `The battery for the ${alert.description.replace(' battery is critically low.', '')} is at ${alert.currentValue}. Schedule a replacement within the next 24 hours.`,
                    priority: 'Immediate',
                    action: { type: 'button', target: 'schedule_replacement', label: 'Schedule Replacement' }
                });
                suggestions.push({
                    text: `Check the sensor's power consumption logs to identify potential issues.`,
                    priority: 'Optional',
                    action: { type: 'link', target: `/sensors/${alert.description.split(' ')[0]}/logs`, label: 'View Logs' }
                });
                break;
        }
    }
  
    return suggestions;
  };
