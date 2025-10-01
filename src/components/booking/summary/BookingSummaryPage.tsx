
"use client";

import { AuthenticatedLayout } from "@/components/authenticated-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getEventById, getAllHotelRooms } from "@/lib/data";
import { CheckCircle, CreditCard, Ticket, BedDouble, Calendar, MapPin, Smartphone, ArrowLeft, Clock, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import type { HotelRoom } from "@/lib/types";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";


const GooglePayIcon = () => <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.24 7.61523V12.3838H14.0768V9.45261C14.0768 8.87856 14.1686 8.4419 14.3521 8.14261C14.5448 7.84333 14.8617 7.69369 15.3028 7.69369C15.7531 7.69369 16.0825 7.84333 16.2904 8.14261C16.5075 8.4419 16.616 8.86938 16.616 9.42621V12.3838H18.4528V9.33615C18.4528 8.45107 18.2356 7.76869 17.7945 7.28902C17.3626 6.80016 16.7135 6.55573 15.8473 6.55573C15.1186 6.55573 14.4925 6.75843 13.969 7.16383V6.63419H12.24V7.61523Z" fill="#5F6368"></path><path d="M21.5035 12.5714C22.2597 12.5714 22.8857 12.3687 23.3824 11.9633C23.879 11.5579 24.1274 10.9649 24.1274 10.1843C24.1274 9.40368 23.879 8.81068 23.3824 8.40528C22.8857 7.99988 22.2597 7.79718 21.5035 7.79718C20.7472 7.79718 20.112 7.99988 19.6154 8.40528C19.1187 8.81068 18.8704 9.40368 18.8704 10.1843C18.8704 10.5518 18.9488 10.893 19.1057 11.2078C19.2626 11.5226 19.489 11.7868 19.7845 11.9991C20.0799 12.2114 20.4261 12.3687 20.8228 12.4705L21.5035 12.5714ZM21.4385 6.55573C22.5644 6.55573 23.4732 6.85501 24.1648 7.45358C24.8656 8.04296 25.216 8.83504 25.216 9.82983C25.216 10.5122 25.0232 11.1108 24.6377 11.6258C24.2614 12.1317 23.738 12.4992 23.0673 12.7291L23.9041 13.9118H22.049V12.8778L21.1919 12.7584C20.6276 12.6783 20.1418 12.5332 19.7345 12.3232C19.3272 12.1132 18.9978 11.8472 18.7469 11.5267C18.496 11.2062 18.3704 10.8291 18.3704 10.3951C18.3704 9.28751 18.756 8.4325 19.5271 7.82885C20.3074 7.21603 21.4385 6.55573 22.5644 6.55573H21.4385Z" fill="#5F6368"></path><path d="M29.7433 7.61523V12.3838H31.5801V7.61523H29.7433ZM29.4311 6.63419H31.8923V13.5H29.4311V6.63419Z" fill="#5F6368"></path><path d="M37.0145 10.0212C37.0145 9.38923 36.8576 8.88232 36.5438 8.49902C36.2301 8.11571 35.8149 7.92318 35.2982 7.92318C34.7815 7.92318 34.3663 8.11571 34.0525 8.49902C33.7388 8.88232 33.5819 9.38923 33.5819 10.0212C33.5819 10.6532 33.7388 11.1601 34.0525 11.5434C34.3663 11.9267 34.7815 12.1182 35.2982 12.1182C35.8149 12.1182 36.2301 11.9267 36.5438 11.5434C36.8576 11.1601 37.0145 10.6532 37.0145 10.0212ZM35.3074 6.55573C36.1086 6.55573 36.7577 6.77287 37.2543 7.20716C37.751 7.64144 38 8.24001 38 9.00171V10.0212C38 10.7921 37.751 11.3998 37.2543 11.8341C36.7577 12.2684 36.1086 12.4855 35.3074 12.4855C34.5062 12.4855 33.8571 12.2684 33.3604 11.8341C32.8638 11.3998 32.6154 10.7921 32.6154 10.0212V9.00171C32.6154 8.24001 32.8638 7.64144 33.3604 7.20716C33.8571 6.77287 34.5062 6.55573 35.3074 6.55573Z" fill="#5F6368"></path><path d="M40.6705 12.3838V7.61523H42.3482L44.0259 10.4578H44.0768L44.833 7.61523H46.4323L44.7546 12.3838H43.1461L41.9726 9.479L41.864 9.05239H41.8131L40.6705 12.3838Z" fill="#5F6368"></path><path d="M10.2222 5.33398C10.2222 5.00693 10.121 4.73595 9.91849 4.52103C9.71597 4.30611 9.45738 4.20093 9.14272 4.20093C8.82806 4.20093 8.56947 4.30611 8.36695 4.52103C8.16443 4.73595 8.06317 5.00693 8.06317 5.33398C8.06317 5.66104 8.16443 5.93202 8.36695 6.14694C8.56947 6.36186 8.82806 6.46704 9.14272 6.46704C9.45738 6.46704 9.71597 6.36186 9.91849 6.14694C10.121 5.93202 10.2222 5.66104 10.2222 5.33398ZM9.95475 7.11084H8.33069V13.5H9.95475V7.11084Z" fill="#5F6368"></path><path d="M4.99595 10.207C4.99595 11.238 5.34091 12.0628 6.03083 12.6814C6.72993 13.2908 7.61907 13.5955 8.69824 13.5955C9.98858 13.5955 11.0115 13.1901 11.7676 12.3787V11.2935C11.134 11.9538 10.2882 12.2834 9.23023 12.2834C8.51272 12.2834 7.93269 12.0807 7.49023 11.6753C7.05695 11.2699 6.83981 10.7481 6.83981 10.1098C6.83981 9.43472 7.05695 8.89704 7.49023 8.4965C7.93269 8.08678 8.51272 7.8819 9.23023 7.8819C10.2882 7.8819 11.134 8.21144 11.7676 8.87179V6.85501C11.0299 6.13419 9.99776 5.77378 8.67981 5.77378C7.59144 5.77378 6.7023 6.08235 6.01238 6.6995C5.33165 7.30746 4.99129 8.13227 4.99129 9.17326L4.99595 10.207Z" fill="#4285F4"></path><path d="M2.20306 0.59668C2.5168 0.59668 2.78461 0.697534 2.99723 0.903823C3.20984 1.10552 3.31518 1.36328 3.31518 1.67702C3.31518 1.99076 3.20984 2.24853 2.99723 2.45481C2.78461 2.65651 2.5168 2.75736 2.20306 2.75736C1.88932 2.75736 1.62151 2.65651 1.4089 2.45481C1.19628 2.24853 1.09082 1.99076 1.09082 1.67702C1.09082 1.36328 1.19628 1.10552 1.4089 0.903823C1.62151 0.697534 1.88932 0.59668 2.20306 0.59668ZM1.16858 13.5V4.07764H3.24219V13.5H1.16858Z" fill="#EA4335"></path><path d="M0 13.5V0.859375H1.83679V13.5H0Z" fill="#FBBC04"></path></svg>;
const ApplePayIcon = () => <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2539 16.5352C12.3398 16.5352 11.75 16.1484 11.1602 15.375C10.5703 14.6016 10.1367 13.6875 10.1367 12.6328C10.1367 11.6016 10.4531 10.7344 11.0859 10.0312C11.7188 9.32812 12.5195 8.97656 13.4883 8.97656C13.9102 8.97656 14.5391 9.08594 15.375 9.30469V7.07812C14.5391 6.83594 13.8477 6.71484 13.3008 6.71484C11.9609 6.71484 10.8672 7.1582 9.99609 7.97266C9.15002 8.78711 8.70703 9.89062 8.70703 11.2812C8.70703 12.3359 8.99219 13.2617 9.5625 14.0586C10.1328 14.8555 10.8711 15.4258 11.7773 15.7695C10.9766 16.4961 10.3906 17.0312 10.0195 17.375L9.625 17.7461L10.9141 18.4219L11.332 17.9648C11.6758 17.582 12.1953 17.0625 12.8906 16.4062C13.5625 16.8906 14.3203 17.1328 15.1641 17.1328C16.1328 17.1328 16.8906 16.8906 17.4375 16.4062C17.9844 15.9219 18.2578 15.25 18.2578 14.3906C18.2578 13.793 18.1133 13.2852 17.8242 12.8672C17.5352 12.4492 17.1328 12.1484 16.6172 11.9648C16.1016 11.7812 15.5312 11.6875 14.9062 11.6875H13.8594V14.6016C13.8594 15.1484 13.9727 15.5352 14.2031 15.7617C14.4336 15.9883 14.7305 16.0977 15.0938 16.0977C15.582 16.0977 16.1133 15.9219 16.6875 15.5703L17.207 16.3281C16.5352 16.8125 15.7773 17.0547 14.9336 17.0547C14.0664 17.0547 13.4414 16.8828 13.0586 16.5586L13.2539 16.5352ZM13.8594 10.6016H14.75C15.4219 10.6016 15.9258 10.7461 16.2617 11.0352C16.5977 11.3242 16.7656 11.7383 16.7656 12.2773C16.7656 12.8164 16.5977 13.2344 16.2617 13.5312C15.9258 13.8281 15.4219 13.9766 14.75 13.9766H13.8594V10.6016Z" fill="black"></path><path d="M22.5645 14.2695C23.0098 14.2695 23.3613 14.1602 23.6191 13.9414C23.877 13.7227 24.0059 13.4336 24.0059 13.0742C24.0059 12.7148 23.877 12.4258 23.6191 12.207C23.3613 11.9883 23.0098 11.8789 22.5645 11.8789C22.1191 11.8789 21.7676 11.9883 21.5098 12.207C21.252 12.4258 21.123 12.7148 21.123 13.0742C21.123 13.4336 21.252 13.7227 21.5098 13.9414C21.7676 14.1602 22.1191 14.2695 22.5645 14.2695ZM22.5645 17.1406C21.6738 17.1406 20.9668 16.9453 20.4434 16.5547C19.9199 16.1641 19.6582 15.6016 19.6582 14.8672V14.5156C19.6582 13.9844 19.7822 13.5156 20.0303 13.1094C20.2783 12.7031 20.627 12.3828 21.0762 12.1484C21.5254 11.9141 22.0293 11.7969 22.5879 11.7969C23.1465 11.7969 23.6504 11.9141 24.1035 12.1484C24.5566 12.3828 24.9082 12.7031 25.1582 13.1094C25.4082 13.5156 25.5332 13.9844 25.5332 14.5156V14.8672C25.5332 15.6016 25.2715 16.1641 24.748 16.5547C24.2246 16.9453 23.5176 17.1406 22.5645 17.1406Z" fill="black"></path><path d="M30.7305 16.9648C30.0156 16.9648 29.4141 16.8008 28.9258 16.4727C28.4375 16.1445 28.0859 15.6953 27.8711 15.125L29.2773 14.5898C29.4141 15.0117 29.6562 15.3398 30.0039 15.5742C30.3516 15.8086 30.7305 15.9258 31.1406 15.9258C31.7891 15.9258 32.2227 15.7148 32.4414 15.293C32.6523 14.8711 32.7578 14.2812 32.7578 13.5234V12.7812C32.5469 13.0664 32.3242 13.3164 32.0898 13.5312C31.8555 13.7461 31.5859 13.9219 31.2812 14.0586C30.9766 14.1953 30.6367 14.2637 30.2617 14.2637C29.3242 14.2637 28.5801 13.9414 28.0293 13.2969C27.4785 12.6523 27.2031 11.7891 27.2031 10.707C27.2031 9.57812 27.5146 8.70312 28.1387 8.08203C28.7627 7.46094 29.584 7.15039 30.6016 7.15039C31.3438 7.15039 32.0205 7.37695 32.6328 7.8291V7.21484H34.1836V13.3906C34.1836 14.543 33.8721 15.4492 33.248 16.1094C32.624 16.7695 31.7891 17.0996 30.7441 17.0996L30.7305 16.9648ZM30.8242 13.25C31.5703 13.25 32.1445 12.9648 32.5469 12.3945C32.9492 11.8242 33.1504 11.0781 33.1504 10.1562C33.1504 9.25781 32.9492 8.53125 32.5469 7.97656C32.1445 7.42188 31.5703 7.14453 30.8242 7.14453C30.0859 7.14453 29.5117 7.42188 29.1016 7.97656C28.6914 8.53125 28.4863 9.25781 28.4863 10.1562C28.4863 11.0781 28.6914 11.8242 29.1016 12.3945C29.5117 12.9648 30.0859 13.25 30.8242 13.25Z" fill="black"></path><path d="M37.332 16.9648H35.7812V7.21484H37.332V16.9648Z" fill="black"></path><path d="M42.2031 16.9648C41.4883 16.9648 40.8867 16.8008 40.3984 16.4727C39.9102 16.1445 39.5586 15.6953 39.3438 15.125L40.75 14.5898C40.8867 15.0117 41.1289 15.3398 41.4766 15.5742C41.8242 15.8086 42.2031 15.9258 42.6133 15.9258C43.2617 15.9258 43.6953 15.7148 43.9141 15.293C44.125 14.8711 44.2305 14.2812 44.2305 13.5234V12.7812C44.0195 13.0664 43.7969 13.3164 43.5625 13.5312C43.3281 13.7461 43.0586 13.9219 42.7539 14.0586C42.4492 14.1953 42.1094 14.2637 41.7344 14.2637C40.7969 14.2637 40.0527 13.9414 39.502 13.2969C38.9512 12.6523 38.6758 11.7891 38.6758 10.707C38.6758 9.57812 38.9873 8.70312 39.6113 8.08203C40.2354 7.46094 41.0566 7.15039 42.0742 7.15039C42.8164 7.15039 43.4932 7.37695 44.1055 7.8291V7.21484H45.6562V13.3906C45.6562 14.543 45.3447 15.4492 44.7207 16.1094C44.0967 16.7695 43.2617 17.0996 42.2168 17.0996L42.2031 16.9648ZM42.2969 13.25C43.043 13.25 43.6172 12.9648 44.0195 12.3945C44.4219 11.8242 44.623 11.0781 44.623 10.1562C44.623 9.25781 44.4219 8.53125 44.0195 7.97656C43.6172 7.42188 43.043 7.14453 42.2969 7.14453C41.5586 7.14453 40.9844 7.42188 40.5742 7.97656C40.1641 8.53125 39.959 9.25781 39.959 10.1562C39.959 11.0781 40.1641 11.8242 40.5742 12.3945C40.9844 12.9648 41.5586 13.25 42.2969 13.25Z" fill="black"></path><path d="M5.42439 12.0391C5.81112 13.5156 7.12753 14.3906 8.35801 14.3906C8.89315 14.3906 9.53965 14.1797 10.0182 13.8359C10.0418 13.8125 10.0654 13.8008 10.0772 13.7773C10.0772 13.7656 10.0654 13.7539 10.0537 13.7422C9.5752 13.3984 9.19688 12.9219 8.94395 12.4453C8.42833 11.4141 8.36934 10.0625 8.95567 9.17188C9.40098 8.49609 10.2252 8.07422 11.1393 8.07422C11.6627 8.07422 12.2193 8.25781 12.698 8.65234C12.7098 8.66406 12.7215 8.66406 12.7332 8.66406C12.7568 8.66406 12.7805 8.65234 12.7922 8.62891C13.5924 7.11328 13.1139 5.25391 11.8092 4.25C10.8736 3.53516 9.68907 3.25 8.70958 3.25C6.73692 3.25 5.29552 4.39453 4.41075 6.00391C3.01817 8.44922 3.86426 11.3633 5.42439 12.0391Z" fill="black"></path><path d="M4.60781 1.76562C5.32265 1.12109 6.2246 0.75 7.1957 0.75C7.94179 0.75 8.61855 0.960938 9.20488 1.40625C9.22851 1.41797 9.24023 1.42969 9.25195 1.45312C9.26367 1.42969 9.27539 1.41797 9.28711 1.40625C9.69726 1.03516 10.084 0.730469 10.4363 0.511719C9.72148 0.175781 8.87539 0 8.0293 0C7.03457 0 6.09899 0.316406 5.34609 0.886719C5.33437 0.898438 5.32265 0.909375 5.31093 0.933594C5.31093 0.909375 5.29921 0.898438 5.2875 0.886719C4.64296 0.441406 3.82851 0.117188 3.01406 0.117188C2.93632 0.117188 2.87031 0.117188 2.80429 0.128906C2.28945 0.234375 1.79843 0.441406 1.34609 0.742188C0.428513 1.35547 0 2.37109 0 3.39453C0 4.58594 0.585938 5.61719 1.49062 6.27344C2.33672 6.88672 3.39297 7.14453 4.41054 7.14453C4.85586 7.14453 5.30117 7.07812 5.71132 6.94531C5.81679 6.91172 5.92226 6.87891 6.02773 6.83594C6.03945 6.82422 6.05117 6.82422 6.06289 6.8125C5.46523 5.74609 5.39609 4.70312 5.86758 3.96094C6.27773 3.31641 7.00429 2.86406 7.76211 2.86406C8.25312 2.86406 8.76797 3.03516 9.17812 3.39453C9.20175 3.40625 9.21347 3.41797 9.23711 3.41797C9.23711 3.41797 9.23711 3.41797 9.23711 3.40625C8.42461 2.5 7.02226 1.83203 5.96836 1.83203C5.5582 1.83203 5.16054 1.88672 4.78945 1.98828L4.60781 1.76562Z" fill="black"></path></svg>;
const PayPalIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.98132 10.23C3.98132 9.53 4.42132 8.9 5.22132 8.9H13.1213C13.6213 8.9 14.1213 8.65 14.4713 8.24L15.3513 7.01C15.5413 6.75 15.8413 6.6 16.1613 6.6H18.9113C19.3613 6.6 19.7213 6.96 19.7213 7.41C19.7213 7.82 19.4213 8.16 19.0113 8.24L16.2013 8.79C15.8013 8.87 15.4213 9.14 15.2613 9.51L14.2813 11.9C14.1913 12.11 14.1213 12.33 14.0713 12.55C14.0713 12.55 14.0713 12.56 14.0613 12.56C13.9813 12.93 13.6313 13.2 13.2413 13.2H6.99132C6.47132 13.2 5.99132 12.75 5.95132 12.23L5.42132 4.29C5.38132 3.74 4.90132 3.3 4.35132 3.3H1.28132C0.731322 3.3 0.281322 3.75 0.281322 4.3C0.281322 4.85 0.731322 5.3 1.28132 5.3H3.68132L4.31132 14.39C4.38132 15.53 5.32132 16.4 6.46132 16.4H13.6413C14.2213 16.4 14.7313 16.09 15.0113 15.62C15.0113 15.62 16.2913 13.59 16.2913 13.58C16.5113 13.22 16.9213 13 17.3613 13H19.5513C20.6813 13 21.6213 12.13 21.7113 11L18.0413 10.45C17.5113 10.37 17.0613 9.94 17.0113 9.4C16.9513 8.74 16.4313 8.21 15.7713 8.2L15.3413 8.12C15.1113 8.08 14.9013 7.95 14.7713 7.77L14.0713 6.78C13.8013 6.41 13.3613 6.2 12.8913 6.2H5.61132C5.06132 6.2 4.61132 6.65 4.61132 7.2C4.61132 7.71 5.00132 8.13 5.51132 8.2L7.15132 8.48C7.50132 8.54 7.78132 8.83 7.82132 9.18L8.35132 14.15C8.40132 14.56 8.74132 14.87 9.15132 14.87H13.5513C13.8213 14.87 14.0613 14.71 14.1813 14.48L15.3913 12.35C15.4113 12.31 15.4313 12.28 15.4413 12.25C15.5413 12.06 15.7613 11.95 15.9813 11.98L19.9013 12.6C20.2113 12.64 20.4613 12.9 20.4613 13.22C20.4613 13.56 20.1913 13.84 19.8513 13.84H17.3613C16.5613 13.84 15.8113 14.27 15.4213 14.94L14.1413 17.02C13.7813 17.62 13.1613 18 12.4913 18H6.46132C4.40132 18 2.65132 16.48 2.42132 14.45L1.57132 7.29C1.49132 6.59 2.03132 6 2.73132 6H12.8913C13.7813 6 14.5913 6.55 14.8513 7.37L13.7813 9.13C13.5913 9.45 13.2413 9.67 12.8613 9.67H5.22132C4.54132 9.67 3.98132 9.11 3.98132 8.43V10.23Z" fill="#0070BA"></path></svg>;

type BookingItem = {
  seat: string;
  stay: HotelRoom | null;
  foodDays: number;
};

const displayTimezones = [
    { label: 'IST', timezone: 'Asia/Kolkata' },
    { label: 'PST', timezone: 'America/Los_Angeles' },
    { label: 'CET', timezone: 'Europe/Berlin' },
];

export default function BookingSummaryPage() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');
    const seatsParam = searchParams.get('seats');
    const staySelectionsParam = searchParams.get('staySelections');
    const foodSelectionsParam = searchParams.get('foodSelections');
    const attendeeDetailsParam = searchParams.get('attendeeDetails');

    const [event, setEvent] = useState<any | null>(null);
    const [allStays, setAllStays] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (eventId) {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            }
            const staysData = await getAllHotelRooms();
            setAllStays(staysData);
            setLoading(false);
        }
        fetchData();
    }, [eventId]);


  if (loading) {
    return <AuthenticatedLayout><div className="container mx-auto max-w-4xl px-4 py-12 text-center">Loading...</div></AuthenticatedLayout>;
  }

  if (!eventId || !seatsParam || !event) {
    notFound();
  }

  const eventDateTime = toZonedTime(`${event.date}T${event.time}`, event.timezone);
  const localTime = format(eventDateTime, 'h:mm a');

  const stayMap = new Map(allStays.map(h => [h.id, h]));

  const staySelections = staySelectionsParam ? staySelectionsParam.split(',').map(s => {
    const [seat, stayId] = s.split(':');
    return { seat, stayId: stayId === 'none' ? null : stayId };
  }) : [];
  
  const foodSelections = foodSelectionsParam ? foodSelectionsParam.split(',').map(s => {
    const [seat, foodDays] = s.split(':');
    return { seat, foodDays: Number(foodDays) };
  }) : [];

  const bookingItems: BookingItem[] = seatsParam.split(',').map(seat => {
    const staySelection = staySelections.find(s => s.seat === seat);
    const foodSelection = foodSelections.find(s => s.seat === seat);
    const stay = staySelection?.stayId ? stayMap.get(staySelection.stayId) : null;
    
    let foodDays = 0;
    if (foodSelection && event.duration > 1 && event.foodDetails) {
        foodDays = foodSelection.foodDays > event.duration ? event.duration : foodSelection.foodDays;
    } else if (foodSelection && event.duration === 1 && event.foodDetails) {
        foodDays = foodSelection.foodDays > 0 ? 1 : 0;
    }

    return {
      seat,
      stay: stay || null,
      foodDays,
    };
  });

  const eventPrice = 0; // Event tickets are free
  const totalStayPrice = bookingItems.reduce((acc, item) => acc + (item.stay?.price || 0), 0);
  const totalFoodPrice = event.foodDetails ? bookingItems.reduce((acc, item) => acc + (item.foodDays * event.foodDetails!.costPerDay), 0) : 0;
  
  const taxes = (eventPrice + totalStayPrice + totalFoodPrice) * 0.1;
  const totalPrice = eventPrice + totalStayPrice + totalFoodPrice + taxes;
  
  const attendeePageUrl = `/booking/attendees?eventId=${eventId}&seats=${seatsParam}`;
  const confirmationUrl = `/booking/confirmation?eventId=${eventId}&seats=${seatsParam}&staySelections=${staySelectionsParam}&foodSelections=${foodSelectionsParam}&attendeeDetails=${attendeeDetailsParam}`;


  return (
    <AuthenticatedLayout>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-500" />
          <div>
            <h1 className="font-headline text-3xl sm:text-4xl font-bold">Booking Summary</h1>
            <p className="text-muted-foreground">Review your selections and choose your payment method.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
             <Card className="overflow-hidden shadow-lg">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                      <Image 
                        src={event.images[0]} 
                        alt={event.name} 
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 pb-0">
                    <CardTitle className="font-headline text-xl sm:text-2xl">{event.name}</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{format(eventDateTime, 'PPP')}</span>
                        </div>
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="flex items-center gap-2 cursor-default">
                                    <Clock className="h-4 w-4" />
                                    <span>{localTime} ({format(eventDateTime, 'zzz')})</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="p-1 space-y-1">
                                    {displayTimezones.map(({label, timezone}) => (
                                        <p key={label} className="text-xs">
                                            {format(toZonedTime(eventDateTime, timezone), 'h:mm a')}
                                            <span className="font-bold ml-1">{label}</span>
                                        </p>
                                    ))}
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:underline"
                        >
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                        </a>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <Separator />
                  
                  <div>
                    <h3 className="font-bold text-lg mb-4">Your Selections</h3>
                    <div className="space-y-4">
                      {bookingItems.map(({ seat, stay, foodDays }) => (
                        <div key={seat} className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Ticket className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="font-bold">Seat {seat}</p>
                                    <p className="text-sm text-muted-foreground">Event Ticket (Free)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {stay ? (
                                   <>
                                    <BedDouble className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="font-semibold">{stay.name}</p>
                                        <p className="text-sm text-muted-foreground">INR {stay.price.toLocaleString('en-IN')}/night</p>
                                    </div>
                                   </>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No stay selected</p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                {foodDays > 0 && event.foodDetails && (
                                   <>
                                    <Utensils className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="font-semibold">Food Package</p>
                                        <p className="text-sm text-muted-foreground">{foodDays} Day(s) - INR {(foodDays * event.foodDetails.costPerDay).toLocaleString('en-IN')}</p>
                                    </div>
                                   </>
                                )}
                            </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />

                  <div>
                    <h3 className="font-bold text-lg mb-4">Price Details</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between"><span>Event Tickets ({bookingItems.length} x INR 0.00)</span><span>INR {eventPrice.toFixed(2)}</span></div>
                      {bookingItems.map(item => item.stay && (
                        <div key={item.seat} className="flex justify-between pl-4">
                          <span>Stay for Seat {item.seat} ({item.stay.name})</span>
                          <span>INR {item.stay.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                      {totalFoodPrice > 0 && event.foodDetails && (
                          <div className="flex justify-between"><span>Food</span><span>INR {totalFoodPrice.toLocaleString('en-IN')}</span></div>
                      )}
                      <div className="flex justify-between"><span>Taxes & Fees</span><span>INR {taxes.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                      <Separator className="my-2"/>
                      <div className="flex justify-between font-bold text-foreground text-lg"><span>Total</span><span>INR {totalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-xl sm:text-2xl">Payment</CardTitle>
                <CardDescription>Select your preferred payment method.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Button size="lg" className="w-full font-bold bg-black hover:bg-gray-800 text-white" >
                    <ApplePayIcon />
                  </Button>
                   <Button size="lg" className="w-full font-bold bg-white hover:bg-gray-100 text-black border border-gray-300" >
                    <GooglePayIcon />
                  </Button>
                   <Button size="lg" className="w-full font-bold bg-[#0070BA] hover:bg-[#005ea6] text-white flex items-center justify-center">
                    <PayPalIcon />
                  </Button>
                   <Button size="lg" className="w-full font-bold" variant="outline">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Pay with UPI ID
                  </Button>
              </CardContent>
              <CardFooter className="bg-muted/50 p-6 flex-col space-y-4">
                 <div className="text-center text-sm text-muted-foreground">Or pay with card</div>
                <Button asChild size="lg" className="w-full font-bold" variant="accent">
                  <Link href={confirmationUrl}>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay INR {totalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} with Card
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                    <Link href={attendeePageUrl}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Attendee Details
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

    