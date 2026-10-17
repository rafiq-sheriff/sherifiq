import { redirect, RedirectType } from 'next/navigation';

export default function ProjectsRoute() {
  redirect('/project', RedirectType.replace);
}

