
export const CATEGORIES = ['Supply', 'Common', 'Exhaust/Return'];
export const RADIUS_RATIO_OPTIONS = [0.50, 0.75, 1.00, 1.50, 2.00];
export const ANGLE_OPTIONS = [45, 90, 135, 180];

export const FITTING_DB = [
  // Supply
  { code: 'SR2-1', category: 'Supply', name: 'Abrupt Exit' },
  { code: 'SR5-15', category: 'Supply', name: 'Bullhead Tee without Vanes, Diverging' },
  { code: 'SR5-13', category: 'Supply', name: 'Tee, 45 Degree Entry Branch, Diverging' },
  { code: 'SR4-2', category: 'Supply', name: 'Transition, Pyramidal (Supply)' },
  { code: 'SD4-2', category: 'Supply', name: 'Transition, Rectangular to Round (Supply)' },
  { code: 'SR4-3', category: 'Supply', name: 'Transition, Round to Rectangular (Supply)' },

  // Common
  { code: 'CR11-1', category: 'Common', name: 'Straight Duct, Rectangular' },
  { code: 'CR9-3', category: 'Common', name: 'Damper, Parallel & Opposed 3V Blades, Open' },
  { code: 'CR9-5', category: 'Common', name: 'Fire Damper, Curtain Type, Type A' },
  { code: 'CR3-1', category: 'Common', name: 'Rectangular Elbow, Smooth Radius without Vanes' },
  { code: 'CD8-5', category: 'Common', name: 'Round Silencer, Ducted, Single Wall with Bullet, Standard Pressure Drop' },
  { code: 'Custom', category: 'Common', name: 'Custom' },

  // Exhaust/Return
  { code: 'ER5-5', category: 'Exhaust/Return', name: 'Bullhead Tee without Vanes, Converging' },
  { code: 'ER5-3', category: 'Exhaust/Return', name: 'Tee, 45 Degree Entry Branch [Ab / As = Ab / Ac = 0.5; As = Ac], Converging' },
  { code: 'ER4-2', category: 'Exhaust/Return', name: 'Transition, Pyramidal (Exhaust/Return)' },
  { code: 'ER4-3', category: 'Exhaust/Return', name: 'Transition, Rectangular to Round (Exhaust/Return)' },
  { code: 'ED4-2', category: 'Exhaust/Return', name: 'Transition, Round to Rectangular (Exhaust/Return)' }
];
