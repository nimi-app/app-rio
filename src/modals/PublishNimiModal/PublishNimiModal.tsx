import { ContractReceipt, ContractTransaction } from '@ethersproject/contracts';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { Modal, Content as ModalContentBase } from '../../components/Modal';
import { getEtherscanExplorerLink } from '../../utils';

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export enum PublishNimiPageStep {
  BUNDLE_NIMI_PAGE, // bundle the Nimi page, upload to IPFS and get the hash
  SET_CONTENT_HASH,
}

export interface PublishNimiModalProps {
  stepsCompleted: PublishNimiPageStep[];

  onClose: () => void;
  isPublishing: boolean;
  isPublished: boolean;
  ensName: string;
  // IPFS
  ipfsHash?: string;
  publishError?: Error;
  // Required
  chainId: number;
}

/**
 * A modal to handle Nimi publishing
 * @returns
 */
export function PublishNimiModal({
  stepsCompleted,
  onClose,
  ipfsHash,
  ensName,
  publishError,
  isPublished,
}: PublishNimiModalProps) {
  const { t } = useTranslation(['common', 'nimi']);

  const isBundleNimiPageComplete =
    ipfsHash && stepsCompleted.includes(PublishNimiPageStep.BUNDLE_NIMI_PAGE) ? true : false;

  // If there is an error, show it
  // @todo: Improve error handling and show more specific errors in each step
  if (publishError) {
    const errorMessage = publishError?.message?.includes('user rejected transaction') ? (
      <>User rejected transaction</>
    ) : (
      <p>Unknown error</p>
    );

    return (
      <Modal handleCloseModal={onClose} title={t('publishNimiModal.title', { ns: 'nimi' })!} maxWidth="560px">
        <ModalContent>
          <Step as="div">{errorMessage}</Step>
        </ModalContent>
      </Modal>
    );
  }

  // Return a stepped modal
  // First step is to bundle the Nimi page (always starts as busy)
  // Second step is to set the content hash on ENS public resolver
  // Third step is to wait for the transaction to be mined
  return (
    <Modal handleCloseModal={onClose} title={t('publishNimiModal.title', { ns: 'nimi' })!} maxWidth="560px">
      <ModalContent>
        {isBundleNimiPageComplete ? (
          <Step {...externalLinkProps} isSuccess={true}>
            Bundled Nimi page 🎉
          </Step>
        ) : (
          <Step isBusy={true}>Bundling your Nimi page 👀</Step>
        )}
        {/* <Step as="div">Update NIMI ID records for {ensName}</Step> */}
        {isPublished ? (
          <Step isBusy={true} target="_blank" rel="noreferrer" href={`https://${ensName}.limo`}>
            Your Nimi has been published
          </Step>
        ) : (
          <Step as="div">Patience is a virtue</Step>
        )}
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled(ModalContentBase)`
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
  flex-grow: 1;
  > p {
    margin-bottom: 10px;
  }
`;

const Step = styled.a<{
  isSuccess?: boolean;
  isBusy?: boolean;
}>(
  (props) => `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  text-align: center;
  padding: 20px;
  font-size: 16px;
  text-decoration: none;
  color: #000;
  &:not(:last-child) {
    border-bottom: 1px solid #000;
  }
  ${props.isBusy ? '' : ''}
  ${props.isSuccess ? '' : ''}
  `
);
