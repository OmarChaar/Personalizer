import { animate, group, query, style, transition, trigger } from "@angular/animations";

// export const fader = trigger('routeAnimations', [
//   transition('* <=> *', [
//     query(':enter, :leave', [
//       style({
//         position: 'absolute',
//         left: 0,
//         width: '100%',
//         opacity: 0,
//         transform: 'scale(0) translateY(100%)'
//       })
//     ]),
//     query(':enter', [
//       animate('600ms ease',
//       style({
//         opacity: 1,
//         transform: 'scale(1) translateY(0)'
//       })
//       )
//     ])
//   ])
// ]);

function fade() {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0) translateY(100%)'
      })
    ]),
    query(':enter', [
      animate('600ms ease',
      style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })
      )
    ])
  ]
}

export const animation = trigger('routeAnimations', [
  transition('isLogin => isPersonalization', slideTo('right')),
  transition('isPersonalization => isLogin', slideTo('left')),

  transition('* => isFade', fade()),

]);

function slideTo(direction: any) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({[direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({
          [direction]: '100%'
        }))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({
          [direction]: '0%'
        }))
      ] ),
    ])
  ];
}
