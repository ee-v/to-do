import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('ListTasksPage => NewTaskPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({ width: '100%' })
            ]),
            query('#new-task', [
                style({
                    opacity: '1'
                })
            ], { optional: true }),
            group([
                query('#new-task', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ opacity: '0' }))
                ], { optional: true }),
                query(':leave', [
                    style({
                        position: 'absolute',
                        left: 0
                    }),
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ left: '100%' }))
                ]),
                query(':enter', [
                    style({ position: 'fixed', transform: 'translateX(-100%)' }),
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ transform: 'translateX(0%)' }))
                ])
            ]),
        ]),
        transition('NewTaskPage => ListTasksPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    right: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({
                    left: '100%',
                })
            ]),
            query('#new-task', [
                style({
                    opacity: '0'
                })
            ], { optional: true }),
            group([
                query(':enter', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ left: '0%' }))
                ]),
                query('#new-task', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ opacity: '1' }))
                ], { optional: true }),
                query(':leave', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ right: '100%' }))
                ])
            ]),
        ]),
        transition('ListTasksPage => EditTaskPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({ width: '100%' })
            ]),
            query('#new-task', [
                style({
                    opacity: '1'
                })
            ], { optional: true }),
            group([
                query('#new-task', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ opacity: '0' }))
                ], { optional: true }),
                query(':leave', [
                    style({
                        position: 'absolute',
                        left: 0
                    }),
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ left: '-100%' }))
                ]),
                query(':enter', [
                    style({ position: 'fixed', transform: 'translateX(100%)' }),
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ transform: 'translateX(0%)' }))
                ])
            ]),
        ]),
        transition('EditTaskPage => ListTasksPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    right: 0,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({
                    left: '-100%',
                })
            ]),
            query(':leave', [
                style({
                    left: '0%',
                })
            ]),
            query('#new-task', [
                style({
                    opacity: '0'
                })
            ], { optional: true }),
            group([
                query(':enter', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ left: '0%' }))
                ]),
                query('#new-task', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ opacity: '1' }))
                ], { optional: true }),
                query(':leave', [
                    animate('600ms cubic-bezier(0.65, 0, 0.35, 1)', style({ left: '100%' }))
                ])
            ]),
        ]),
    ]);
export const alertAnimation =
    trigger('alertAnimation', [
        transition('void => visible', [
            style({ opacity: 0, transform: 'translateY(-100%)' }),
            animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
        ]),
        transition('visible => void', [
            style({ opacity: 1, transform: 'translateY(0)' }),
            animate('500ms ease-out', style({ opacity: 0, transform: 'translateY(-100%)' }))
        ])
    ]);