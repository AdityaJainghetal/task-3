import { useSelector } from 'react-redux';
import CMSForm from './CMSForm';
// import {PreviewPane} from '../Component/Previewpane';/
import { Navigate } from 'react-router-dom';
import PreviewPane from './PreviewPane';

export default function Home() {


  return (
    <div className="flex min-h-screen">
      <CMSForm />
      <PreviewPane />
    </div>
  );
}